import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPokemons, createPokemon, getTypes } from "../Redux/actions";
import Style from './Form.module.css'

const Form = () => {
    
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const [input, setInput] = useState({
        name: '', 
        hp: '', 
        attack: '', 
        defense: '', 
        speed: '',
        height: '', 
        weight: '', 
        types: [],
        img: ''
    })

    let noEmpty = /\S+/;
    let validateName = /^[a-z]+$/i;
    let validateNum = /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

    const validate = (input) => {
        let errors = {};
        if(!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3){
            errors.name = "Name required. Only words with more than two letters are allowed"
        }
        if(!validateNum.test(input.hp) || parseInt(input.hp) < 1 ){
            errors.hp = "Number required. Only higher tan one"
        }
        if(!validateNum.test(input.attack) || parseInt(input.attack) < 1 ){
            errors.attack = "Number required. Only higher tan one"
        }
        if(!validateNum.test(input.defense) || parseInt(input.defense) < 1 ){
            errors.defense = "Number required. Only higher tan one"
        }
        if(!validateNum.test(input.speed) || parseInt(input.speed) < 1 ){
            errors.speed = "Number required. Only higher tan one"
        }
        if(!validateNum.test(input.height) || parseInt(input.height) < 1 ){
            errors.height = "Number required. Only higher tan one"
        }
        if(!validateNum.test(input.weight) || parseInt(input.weight) < 1 ){
            errors.weight = "Number required. Only higher tan one"
        }
        if(!validateUrl.test(input.img)){
            errors.img = "URL required"
        }
        return errors;
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    const handleSelect = (e) => {
        if(input.types.length < 2){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
            e.target.value = 'Select type';
        } else {
            alert('Two types of pokemon at most')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            !errors.name &&
            !errors.hp &&
            !errors.attack &&
            !errors.defense &&
            !errors.speed &&
            !errors.height &&
            !errors.weight &&
            !errors.img
        ){
            dispatch(createPokemon(input));
            setInput({
                name: '', 
                hp: '', 
                attack: '', 
                defense: '', 
                speed: '',
                height: '', 
                weight: '', 
                types: [],
                img: ''
            });
            dispatch(cleanPokemons(dispatch));
            history.push('/form')
        } else {
            alert('Error in the form')
        }
    };

    const handleDelete = (e) => {
        setInput({
            ...input,
            types: input.types.filter((type) => type !== e)
        })
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    return(
        <div className={Style.container}>
            <Link to='/home' >
                <button className={Style.btn}> Go Back</button>
            </Link>
            <form className={Style.form} onSubmit={e => {handleSubmit(e)}} >
                <h3 className={Style.h2} >Create a Pokemon</h3>
                    <div className={Style.div}>
                        <div className={Style.divito}>
                            <label className={Style.label}> Name: </label>
                            <input className={Style.input} type='text' value={input.name} name='name' onChange={e => {handleChange(e)}} placeholder='Name' />
                            <p className={Style.p}>{errors.name} </p>
                            <label className={Style.label}> HP: </label>
                            <input className={Style.input} type='number' value={input.hp} name='hp' onChange={e => {handleChange(e)}} placeholder='HP' />
                            <p className={Style.p}>{errors.hp} </p>
                            <label className={Style.label}> Attack: </label>
                            <input className={Style.input} type='number' value={input.attack} name='attack' onChange={e => {handleChange(e)}} placeholder='Attack' />
                            <p className={Style.p}>{errors.attack} </p>
                            <label className={Style.label}> Defense: </label>
                            <input className={Style.input} type='number' value={input.defense} name='defense' onChange={e => {handleChange(e)}} placeholder='Defense' />
                            <p className={Style.p}>{errors.defense} </p>
                        </div>
                        <div className={Style.divito}>
                            <label className={Style.label}> Speed: </label>
                            <input className={Style.input} type='number' value={input.speed} name='speed' onChange={e => {handleChange(e)}} placeholder='Speed' />
                            <p className={Style.p}>{errors.speed} </p>
                            <label className={Style.label}> Height: </label>
                            <input className={Style.input} type='number' value={input.height} name='height' onChange={e => {handleChange(e)}} placeholder='Height' />
                            <p className={Style.p} >{errors.height} </p>
                            <label className={Style.label}> Weight: </label>
                            <input className={Style.input} type='number' value={input.weight} name='weight' onChange={e => {handleChange(e)}} placeholder='Weight' />
                            <p className={Style.p}>{errors.weight} </p>
                            <label className={Style.label}> Image: </label>
                            <input className={Style.input} type='text' value={input.img} name='img' onChange={e => {handleChange(e)}} placeholder='Image URL' />
                            <p className={Style.p}>{errors.img} </p>
                        </div>
                    </div>
                <div>
                    <select className={Style.select} name="select" onChange={e => {handleSelect(e)}}>
                    <option>Select type</option>
                        {
                            types?.map((e,k) => {
                                return (
                                    <option key={k} value={e}>{e.toUpperCase()}</option>
                                )
                            })
                        }
                    </select>
                            {
                                input.types.map(e => {
                                    return (
                                        <div className={Style.typesSelect} key={e}>
                                            <p className={Style.pTypes}>{e}</p>
                                            <button className={Style.btnDelete} onClick={() => {handleDelete(e)}}>x</button>
                                        </div>
                                    )
                                }) //para poder ver que fui seleccionando
                            }
                </div>
            <button className={Style.btnCreate} type='submit'>Create!</button>
            </form>
        </div>
    )
}

export default Form;