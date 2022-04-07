import {useLocation, Link} from 'react-router-dom';

const Message = () => {
  const {state} = useLocation();
  console.log(state)
  const {msg, link} = state;
  console.log(msg);
  console.log(link);

  return(
    <h1>{msg} <Link to={`/${link}`}>{link}</Link></h1>
  )
}

export default Message;