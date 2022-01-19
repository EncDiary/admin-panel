import { FC } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

interface StatisticPaginatorProps {
  setPeriod: (value: React.SetStateAction<string>) => void;
  period: string;
  goToPeriod: (timeShift: number) => void;
  date: Date;
}

const StatisticPaginator: FC<StatisticPaginatorProps> = ({
  setPeriod,
  period,
  goToPeriod,
  date,
}) => {
  return (
    <div>
      <FormGroup
        className="d-flex align-items-center gap-3 mx-auto my-4"
        style={{ width: "min-content" }}
      >
        <Label>Period</Label>
        <Input
          type="select"
          onChange={(e) => setPeriod(e.target.value)}
          value={period}
          style={{
            width: "min-content",
          }}
        >
          <option value="month">Month</option>
          <option value="year">Year</option>
        </Input>
      </FormGroup>

      <div className="d-flex align-items-center justify-content-center mt-3 mb-3">
        <Button onClick={() => goToPeriod(-1)} color="primary">
          Prev.
        </Button>

        <span className="mx-4">
          {period === "month"
            ? date.toLocaleDateString("en", {
                month: "long",
                year: "numeric",
              })
            : date.getFullYear()}
        </span>

        <Button onClick={() => goToPeriod(1)} color="primary">
          Next
        </Button>
      </div>
    </div>
  );
};

export default StatisticPaginator;
