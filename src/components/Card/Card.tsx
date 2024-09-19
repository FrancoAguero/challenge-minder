import { Checkbox, Grid, Paper, Typography } from "@mui/material";
import { TaskI } from "../../pages/TodoList/module/domain/Tasks";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoriesI } from "../../pages/TodoList/module/domain/Categories";
import { useTodoList } from "../../pages/TodoList/ui/context/TodoListProvider";

interface CardI extends TaskI {}

export default function Card({
  id,
  title,
  description,
  completed,
  category_id,
}: CardI) {
  const { putTask } = useTodoList();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: TaskI) => putTask(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const categories = queryClient.getQueryData(["categories"]) as CategoriesI[];

  const categoryBg =
    categories?.find((cat) => cat.id === category_id)?.color || "white";

  const handleCheck = () => {
    mutation.mutate({
      id,
      title,
      description,
      completed: !completed,
      category_id,
    });
  };

  return (
    <Grid
      item
      container
      xs={12}
      component={Paper}
      elevation={3}
      justifyContent={"flex-start"}
      alignItems={"center"}
      sx={{
        height: 64,
        backgroundColor: categoryBg,
      }}
    >
      <Grid
        item
        container
        xs={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Checkbox checked={completed} onClick={handleCheck} />
      </Grid>
      <Grid item container xs={11} direction={"column"}>
        <Typography fontSize={16} fontWeight={400}>
          {title}
        </Typography>
        <Typography fontSize={14} fontWeight={400}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
}
