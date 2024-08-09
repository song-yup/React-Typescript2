import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const DeleteImg = styled.img`
    width: 30px;
    height: 25px;
    margin-right: 10px;
    margin-top: 15px;
`;

function ToDo({ text, id, category }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const oldToDo = oldToDos[targetIndex];
            const newToDo = { text, category: name as any, id };
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1),];
        });
    };

    const onDelete = () => {
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            return [...oldToDos.slice(0,targetIndex),...oldToDos.slice(targetIndex + 1),];
        })
    };

    return (
        <li>
            <span>{id}: {text}</span>
            {category !== Categories.Done && (
                <button name={Categories.Done} onClick={onClick}>Done</button>
            )}
            {category !== Categories.To_Do && (
                <button name={Categories.To_Do} onClick={onClick}>To Do</button>
            )}
            {category !== Categories.Doing && (
                <button name={Categories.Doing} onClick={onClick}>Doing</button>
            )}
            <DeleteImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCdxrqy0eWktIi-Um2x6Lj1ZyFtcI_M6SvSw&s" alt="삭제" onClick={onDelete} />
        </li>
    );
}

export default ToDo;