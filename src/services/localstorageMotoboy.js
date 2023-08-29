import uuid from "react-uuid";

export const getListOfMotoboys = () => {
    if(!localStorage["@motoboys"]){
        localStorage["@motoboys"] = JSON.stringify([]);
    }

    let motoboys = JSON.parse(localStorage["@motoboys"]);
    return motoboys;
}

export const getMotoboyById = (id) => {
    const motoboys = getListOfMotoboys();
    const motoboy = motoboys.find((motoboy) => motoboy.id === id);
    return motoboy;
};

export const addMotoboy = (motoboy) => {
    const motoboys = getListOfMotoboys();
    motoboys.push({ id: uuid(), ...motoboy });
    localStorage["@motoboys"] = JSON.stringify(motoboys);
};

export const editMotoboy = (id, newMotoboy) => {
    let motoboys = getListOfMotoboys();
    motoboys = motoboys.filter(motoboy => motoboy.id !== id);
    motoboys.push(newMotoboy );
    localStorage["@motoboys"]= JSON.stringify(motoboys);
};

export const deleteMotoboy = (id) => {
    let motoboys = getListOfMotoboys();
    motoboys = motoboys.filter(motoboy => motoboy.id !== id);
    localStorage["@motoboys"]= JSON.stringify(motoboys);
};