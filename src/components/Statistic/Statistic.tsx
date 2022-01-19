import { FC, useEffect, useMemo, useState } from "react";
import {
  getStatsMonthRequest,
  getStatsYearRequest,
} from "../../modules/request/statistic";
import { IAccount } from "../../types/user";
import LineChart from "../Chart/LineChart";
import StatisticPaginator from "./StatisticPaginator";

interface StatisticProps {
  account: IAccount;
}

const Statistic: FC<StatisticProps> = ({ account }) => {
  const getStartMonthDate = (startDate = new Date()) => {
    startDate.setDate(1);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    return startDate;
  };

  const [startDate, setStartDate] = useState(getStartMonthDate());

  const [period, setPeriod] = useState("month");

  const labels = useMemo(() => {
    const date = new Date(startDate);

    switch (period) {
      case "month":
        const currentMonth = date.getMonth();
        const days: string[] = [];
        while (date.getMonth() === currentMonth) {
          days.push(
            date.toLocaleString("ru", { month: "numeric", day: "numeric" })
          );
          date.setDate(date.getDate() + 1);
        }
        return days;
      case "year":
        const currentYear = date.getFullYear();
        const months: string[] = [];
        while (date.getFullYear() === currentYear) {
          months.push(
            date.toLocaleString("ru", { year: "numeric", month: "numeric" })
          );
          date.setMonth(date.getMonth() + 1);
        }
        return months;
      default:
        return [];
    }
  }, [startDate, period]);

  const [usersStat, setUsersStat] = useState(labels.map(() => 0));
  const [notesStat, setNotesStat] = useState(labels.map(() => 0));

  useEffect(() => {
    (async () => {
      const serverResponse =
        period === "month"
          ? await getStatsMonthRequest(
              account,
              startDate.getFullYear(),
              startDate.getMonth() + 1
            )
          : await getStatsYearRequest(account, startDate.getFullYear());

      if (!serverResponse) return;

      const serverData: {
        users: { [key: string]: number };
        notes: { [key: string]: number };
      } = serverResponse.data;

      setUsersStat(labels.map((day) => serverData.users[day] || 0));
      setNotesStat(labels.map((day) => serverData.notes[day] || 0));
    })();
  }, [account, labels, startDate, period]);

  const goToPeriod = (timeShift: number) => {
    const newStartDate = new Date(startDate);
    if (period === "month") {
      newStartDate.setMonth(newStartDate.getMonth() + timeShift);
    } else {
      newStartDate.setFullYear(newStartDate.getFullYear() + timeShift);
    }
    setStartDate(newStartDate);
  };

  return (
    <>
      <StatisticPaginator
        setPeriod={setPeriod}
        period={period}
        goToPeriod={goToPeriod}
        date={startDate}
      />
      <div className="d-flex">
        <LineChart labels={labels} title="New Users" stat={usersStat} />
        <LineChart labels={labels} title="New Notes" stat={notesStat} />
      </div>
    </>
  );
};

export default Statistic;
