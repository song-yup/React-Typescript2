import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import ToDo from "./ToDo";
import styled from "styled-components";

const Title = styled.h1`
    color: white;
    text-align: center;
    font-size: 40px;
`;


const ToDoForm = styled.div`
    margin-left: 33%;
    align-content: center;
`;

const ListToDo = styled.div`
    text-align: center;
    width: 500px;
    height:500px;
    border-radius: 10px;
    background-color: gray;
    border-color: white;
    color: white;
    box-align: center;
`;

const CreateListForm = styled.div`
    padding: 10px;
    margin-left: 100px;
    text-align: center;
    display: flex;
`;

function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };
    console.log(toDos);

    return (
        <div>
            <Title>To Dos</Title>
            <hr />
            <ToDoForm>
                <CreateListForm>
                    <CreateToDo />
                    <select value={category} onInput={onInput}>
                        <option value={Categories.To_Do}>To Do</option>
                        <option value={Categories.Doing}>Doing</option>
                        <option value={Categories.Done}>Done</option>
                    </select>                    
                </CreateListForm>
                <ListToDo>
                    <Title>{category}</Title>
                    <hr />
                    {toDos?.map(toDo => <ToDo key={toDo.id} {...toDo}/>)}                        
                </ListToDo>
            </ToDoForm>
        </div>
    );
}

// interface IuseForm {
//     Email:          string;
//     FirstName:      string;
//     LastName:       string;
//     UserName:       string;
//     Password:       string;
//     PasswordCheck:  string;
//     extraError?:    string;
// }

// function ToDoList() {
//     const { 
//         register, 
//         handleSubmit, 
//         formState:{ errors },
//         setError
//     } = useForm<IuseForm>({
//         defaultValues: {
//             Email: "@naver.com"
//         }
//     });

//     const onValid = (data: IuseForm) => {
//         if(data.Password !== data.PasswordCheck) {
//             setError(
//                 "PasswordCheck", 
//                 { message: "Password are not th same" }, 
//                 { shouldFocus: true }
//             );
//         }
//         setError("extraError", { message: "Server Offline!" });
//     };

//     return (
//         <div>
//             <form style={{ display:"flex", flexDirection: "column" }} onSubmit={ handleSubmit(onValid) }>
//                 <input 
//                     {...register("Email", { 
//                         required: "Emil is Required.", 
//                         pattern: {
//                             value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//                             message: "Only naver.com emails allowed",
//                         },
//                     })} 
//                     placeholder="Email" 
//                 />
//                 <span>{errors?.Email?.message}</span>
//                 <input 
//                     {...register("FirstName", { 
//                         required: "Write Here", 
//                         validate: {
//                             noNico: (value) =>
//                                 value.includes("nico") ? "NO nico allowed" : true,
//                             noNick: (value) =>
//                                 value.includes("nick") ? "No nick allowed" : true,
//                         },
//                     })} 
//                     placeholder="First Name" 
//                 />
//                 <span>{errors?.FirstName?.message}</span>
//                 <input 
//                     {...register("LastName", { 
//                         required: "Write Here",
//                     })} 
//                     placeholder="Last Name" 
//                 />
//                 <span>{errors?.LastName?.message}</span>
//                 <input 
//                     {...register("UserName", { 
//                         required: "Write Here",
//                     })} 
//                     placeholder="UserName" 
//                 />
//                 <span>{errors?.UserName?.message}</span>
//                 <input 
//                     {...register("Password", { 
//                         required: "Write Here", 
//                         minLength: {
//                             value: 5,
//                             message: "Your Password is too short!",
//                         } 
//                     })} 
//                     placeholder="Password" 
//                 />
//                 <span>{errors?.Password?.message}</span>
//                 <input 
//                     {...register("PasswordCheck", { 
//                         required: "PasswordCheck is Required" 
//                     })} 
//                     placeholder="PasswordCheck" 
//                 />
//                 <span>{errors?.PasswordCheck?.message}</span>
//                 <button>Add</button>
//                 <span>{errors?.extraError?.message}</span>
//             </form>
//         </div>
//     );
// }

export default ToDoList;