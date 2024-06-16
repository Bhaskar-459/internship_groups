import { useState, useEffect } from "react";
import NavBarComp from "./components/NavBarComp";
import CardComp from "./components/CardComp";
import FormComp from "./components/FormComp";
import Groups from "./components/GroupsCard";
import UserDataCard from "./components/UserDataCard";
import CreateGrpComp from "./components/CreateGrpComp";
import TableComp from "./components/Table";

;

function App() {
  const [Login, setLogin] = useState(false);
  const [grouped, setGrouped] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('user_id')){
      setLogin(true);
    }
    if(localStorage.getItem('group_id')){
      setGrouped(true);
    }
  }, []);

  return (
    <>
      <NavBarComp />
      {grouped ? null : Login ? <CreateGrpComp /> : null}
      <Groups />
      {Login ? <UserDataCard /> : <FormComp />}
      <TableComp />
    </>
  );
}

export default App;
