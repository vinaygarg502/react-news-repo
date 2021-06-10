import React, { useState, useCallback, useEffect, useRef } from 'react';
import './header.scss';
import logo from './../../assets/Logo_White.png';
import searchIcon from './../../assets/search-icon@2x.svg';
import { useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';

const Header = ()=>{
    const history = useHistory();
    const [showInput,setShowInput] = useState(false);
    const searchRef = useRef(null);

    const toggleInput = ()=>{
        setShowInput(!showInput);
    }
    const goToHome =()=>{
        history.push({
            pathname: `/`,
        });
    };
    const changeHandler = (e)=>{
        history.push({
            pathname: `/search/?q=${e.target.value}`
        });
    }
    const debouncedChangeHandler = useCallback(
        debounce(changeHandler, 1000)
      , []);

    useEffect(() => {
        if(showInput){
            searchRef.current.focus();
        }
        return () => {
          debouncedChangeHandler.cancel();
        }
      }, [debouncedChangeHandler,showInput]);

    return (
        <header>
            <div className="logo-container" onClick = {goToHome}>
                <img src = {logo} alt="The Peaks" />
            </div>
            <div className={`search-container ${ showInput ? 'show' : ''}`}>
                {showInput && <input type="text" placeholder="Search All News" onChange={debouncedChangeHandler} ref={searchRef}/>}
                <img src ={searchIcon} alt="searchIcon" onClick={toggleInput} />
            </div>
        </header>
    );
}

export default Header;