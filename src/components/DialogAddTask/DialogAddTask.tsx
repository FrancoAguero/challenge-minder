import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { CategoriesI } from "../../pages/TodoList/module/domain/Categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTodoList } from "../../pages/TodoList/ui/context/TodoListProvider";

interface DialogAddTaskI {
  open: boolean;
  categories: CategoriesI[];
  onClose: () => void;
}

export default function DialogAddTask({
  open,
  categories,
  onClose,
}: DialogAddTaskI) {
  const { postTask } = useTodoList();
  const initialStateForm = {
    title: "",
    description: "",
    category_id: "",
  };
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialStateForm);

  const mutation = useMutation({
    mutationFn: postTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      handleClose();
    },
  });

  const handleForm = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === "title" && target.value.length > 40) return;
    if (target.name === "description" && target.value.length > 100) return;

    setForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleClose = () => {
    onClose();
    setForm(initialStateForm);
  };

  const handleSubmit = () => {
    if (form.title.length && form.category_id.length) {
      mutation.mutate({
        id: crypto.randomUUID(),
        title: form.title,
        description: form.description,
        category_id: form.category_id,
        completed: false,
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <DialogTitle>Nueva tarea</DialogTitle>
        <DialogContent>
          <Grid container gap={2}>
            <TextField
              name="title"
              label="Titulo *"
              value={form.title}
              onChange={handleForm}
              variant="standard"
              fullWidth
            />
            <TextField
              name="description"
              label="Descripcion"
              value={form.description}
              onChange={handleForm}
              variant="standard"
              fullWidth
            />
            <TextField
              name="category_id"
              label="Categorias *"
              value={form.category_id}
              onChange={handleForm}
              variant="standard"
              fullWidth
              select
            >
              {categories?.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Crear
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
