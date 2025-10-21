import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useParams } from "react-router-dom";

export default function Chat() {
  const { friend: friendId } = useParams(); // принимаем id человека, на кот. нажали в users
  const [me, setMe] = useState({}); // текущий пользователь
  const [friend, setFriend] = useState(); // собеседник
  const [messages, setMessages] = useState(); // список всех сообщений
  const [text, setText] = useState(); // текущее сообщение

  // подгрузка для тек. пользователя
  useEffect(() => {
    async function loadMe() {
      const { data } = await supabase.auth.getSession();
      setMe(data?.session.user);
    }
    loadMe();
  }, []);

  /*useEffect(() => {
    console.log(me);
  }, [me]);*/

  return <div>V.I.ShootOff</div>;
}
