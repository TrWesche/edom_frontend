import React from 'react';
import { NavigateFunction } from 'react-router-dom';

export const handleClickMouseEvent = (
    e: React.MouseEvent, 
    navigate: NavigateFunction,
    target: string, 
    newTab: boolean = false) => 
{
    e.preventDefault();
    
    if (target !== undefined) {
        if (newTab) {
            window.open(target, '_blank');
        } else {
            navigate(target);
        }
    } else {
        console.log("Error, destination not defined")
    }
};