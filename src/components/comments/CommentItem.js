import classes from './CommentItem.module.css';

const CommentItem = (props) => {
  return (
    <li key={props.key} className={classes.item}>
      <p>{props.text}</p>
    </li>
  );
};

export default CommentItem;
