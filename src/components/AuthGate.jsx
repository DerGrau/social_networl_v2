import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function AuthGate({ sendSession, children }) {
  const [session, setSession] = useState();

  // Получение текущей сессии + подписка на изменения
  useEffect(() => {
    let unsub = () => {};
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      const { data: sub } = await supabase.auth.onAuthStateChange(
        (_event, newSession) => setSession(newSession)
      );
      unsub = () => sub.subscription.unsubscribe();
    })();

    return () => unsub();
  }, []);

  // Создание/обновление профиля по факту наличия пользователя + проброс сессии вверх
  useEffect(() => {
    async function createProfileNote() {
      const { error } = await supabase.from("profiles").upsert([
        {
          id: session.user.id,
          email: session.user.email,
          updated_at: new Date().toISOString(),
        },
      ]);
      if (error) console.error(error);
    }

    if (session?.user) createProfileNote();

    // если нет сессии — отправляем null, чтобы App мог показать /login
    sendSession(session ?? null);
  }, [session, sendSession]);

  return <>{children}</>;
}

// import { useEffect, useState } from "react";
// import { supabase } from "../supabase";

// export default function AuthGate({ sendSession, children }) {
//   const [session, setSession] = useState();

//   // сразу при запуске сайта
//   useEffect(() => {
//     async function getSession() {
//       const { data } = await supabase.auth.getSession();
//       setSession(data.session); // session - или null или объект
//     }

//     getSession();

//     // подписка на вход/выход/обновление токена
//     const { data: sub } = supabase.auth.onAuthStateChange(
//       (_event, newSession) => {
//         setSession(newSession);
//       }
//     );
//   }, []);

//   // отправляем сессию в App (-> setSession) только при ее изменении
//   useEffect(() => {
//     async function createProfileNote() {
//       const { error } = await supabase.from("Profiles").upsert([
//         {
//           id: session.user.id,
//           email: session.user.email,
//           updated_at: new Date().toISOString(),
//         },
//       ]);

//       if (error) console.error(error);
//     }

//     if (session?.user) createProfileNote();

//     sendSession(session);
//   }, [session]);

//   return <div>{children}</div>;
// }

// /*async function subSession() {
//       const { data: sub } = await supabase.auth.onAuthStateChange(
//         (_event, newSession) => {
//           setSession(newSession);
//         }
//       );

//       let unsub = () => {};
//       // сохраняет в п-ю unsub ф-ю, кот. при вызове отпишет нас от событий onAuthStateChange
//       unsub = () => sub.subscription.unsubscribe();
//       return () => unsub();
//     }*/

// /*
//   let content;
//   if (session === undefined) content = <div>Loading...</div>;
//   else if (session === null) content = nullsession;
//   else content = children;

// */

// //
// //
// //
// //
// //
// //
// //

// // отслеживание изменений сессии
// // onAuthStateChange следит за входом/выходом изм токена

// /*useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.onAuthStateChange(
//         (_event, newSession) => {
//           setSession(newSession);
//         }
//       );
//       //console.log(data);
//     }
//     checkSession();
//   }, []);*/

// /*

// import { useEffect, useState } from "react";
// import { supabase } from "./supabase";
// export default function AuthGate({ children, nullsession, OnSellSession }) {
//   const [session, setSession] = useState(null);
//   useEffect(() => {
//     async function getSession() {
//       const { data, error } = await supabase.auth.getSession();
//       if (error) {
//         console.error(error);
//       } else {
//         setSession(data); //session - это либо null либо объект
//       }
//     }
//     getSession();
//   }, []);
//   //показ контента в зависимости от session
//   let content;
//   if (session === undefined) {
//     content = <div>Загрузка...</div>;
//   } else if (session === null) {
//     content = nullsession;
//   } else {
//     content = children;
//   }
//   OnSellSession(session);
//   return <div>{content}</div>;
// }

// */
