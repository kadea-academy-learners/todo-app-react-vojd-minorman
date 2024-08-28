

interface TodoItemProps {
  task: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onDelete: () => void;
}

function TodoItem(props: TodoItemProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={props.isCompleted}
        onChange={props.onToggleComplete}
      />
      <span style={{ textDecoration: props.isCompleted ? 'line-through' : 'none', marginLeft: 8 }}>
        {props.task}
      </span>
      <button onClick={props.onDelete} style={{ marginLeft: 'auto' }}>Supprimer</button>
    </div>
  );
}

export default TodoItem;
