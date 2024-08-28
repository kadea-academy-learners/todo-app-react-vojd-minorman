

interface TodoItemProps {
  task: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

function TodoItem({ task, isCompleted, onToggleComplete, onDelete, onEdit }: TodoItemProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin : '10px', borderBottom : '1px solid #ffff5' }}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={onToggleComplete}
      />
      <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
        {task}
      </span>
      <button onClick={onEdit} style={{ margin : '0px 10px' }}>Modifier</button>
      <button onClick={onDelete} style={{ margin : '0px 10px' }}>Supprimer</button>
    </div>
  );
}

export default TodoItem;
