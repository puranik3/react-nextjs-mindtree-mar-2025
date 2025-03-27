interface Props {
  title: string,
  color?: string
}

export default function App({ title, color = 'gray' } : Props) {
  console.log(title, color);

  return (
    <button style={{
      backgroundColor: color
    }}>{title}</button>
  );
}

// App.defaultProps = {
//   color: 'gray'
// };