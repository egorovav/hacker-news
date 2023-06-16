import {NewsItem} from "./NewsItem/NewsItem";
import {useEffect, useState} from "react";

const initNews = [
  { title: 'Первая новость', url: 'www.example.com', username: 'Пользователь 1', date: '10.10.11', score: 10, id: 1 },
  { title: 'Вторая новость', url: 'www.example.com', username: 'Пользователь 2', date: '11.10.11', score: 100, id: 2 },
  { title: 'Третья новость', url: 'www.example.com', username: 'Пользователь 3', date: '12.10.11', score: 20, id: 3 }
]

const newNews = {
  title: 'Новая новость',
  url: 'www.example.com',
  username: 'Пользователь',
  date: '10.10.11', score: 1,
  id: 4
}
function App() {

  const [news, setNews] =
      useState(JSON.parse(window.localStorage.getItem("keyNews")) || initNews);

  useEffect(() => {
    window.localStorage.setItem("keyNews", JSON.stringify(news));
  }, [news]);

  const newsCountHandler = () => {
    setNews((prevState) => [...prevState, newNews]);
    console.log(news.length);
  };

  return (
      <>
        <div>Колличество новостей: {news.length}</div>
        <button onClick={newsCountHandler}>Добавить новость.</button>
        {
          news.map(item => {
            return (<NewsItem
                    key={item.id}
                    title={item.title}
                    url={item.url}
                    username={item.username}
                    date={item.date} score={item.score}
                />
            )
          })
        }
      </>
  );
}

export default App;
