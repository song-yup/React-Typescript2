import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";  // session 일시적으로 저장해준다

export enum Categories {
    "To_Do" = "To_Do",
    "Doing" = "Doing",
    "Done" = "Done",
}

export interface IToDo {
    text: string;
    category: Categories;
    id: number;
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.To_Do,
})

const { persistAtom } = recoilPersist({
    key: "toDoLocal",
    storage: localStorage,
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});