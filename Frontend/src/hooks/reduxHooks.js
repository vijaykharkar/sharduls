import { useDispatch, useSelector } from 'react-redux';

/** Typed dispatch hook — always use this instead of plain useDispatch */
export const useAppDispatch = () => useDispatch();

/** Typed selector hook — always use this instead of plain useSelector */
export const useAppSelector = useSelector;
