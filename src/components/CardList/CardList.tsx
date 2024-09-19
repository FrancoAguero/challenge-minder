import { Grid, Typography } from "@mui/material";
import { TaskI } from "../../pages/TodoList/module/domain/Tasks";
import Card from "../Card/Card";

interface CardList {
  title: string;
  data: TaskI[];
}

export default function CardList({ title, data }: CardList) {
  return (
    <Grid item container xs={12} gap={2}>
      <Typography fontSize={20} fontWeight={500}>
        {title}
      </Typography>
      {data?.map((task) => (
        <Card key={task.id} {...task} />
      ))}
    </Grid>
  );
}
