import { Fab, Grid, Typography } from "@mui/material";
import { useTodoList } from "./context/TodoListProvider";
import { useQuery } from "@tanstack/react-query";
import CardList from "../../../components/CardList/CardList";
import { useState } from "react";
import { AddRounded } from "@mui/icons-material";
import DialogAddTask from "../../../components/DialogAddTask/DialogAddTask";

interface TodoViewI {}

export default function TodoView({}: TodoViewI) {
  const { getTasks, getCategories } = useTodoList();
  const [showDialog, setShowDialog] = useState(false);

  const { data: dataTasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  const { data: dataCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const handleShowDialog = () => {
    setShowDialog(!showDialog);
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} py={5}>
      <Grid item container xs={6} gap={2}>
        <Grid item container xs={12}>
          <Typography fontSize={48} fontWeight={400}>
            Lista de Tareas
          </Typography>
        </Grid>
        <CardList title="Pendientes" data={dataTasks?.pending || []} />
        <CardList title="Terminadas" data={dataTasks?.completed || []} />
      </Grid>
      <Fab
        color="primary"
        onClick={handleShowDialog}
        sx={{ position: "absolute", right: "25%", bottom: 20 }}
      >
        <AddRounded />
      </Fab>
      <DialogAddTask
        open={showDialog}
        categories={dataCategories || []}
        onClose={handleShowDialog}
      />
    </Grid>
  );
}
