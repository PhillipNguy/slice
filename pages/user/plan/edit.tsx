import { useState, FormEvent, ChangeEvent, ChangeEventHandler, FormEventHandler } from 'react';
import DoughnutChart from '../../../components/DoughnutChart';
import RecipeList from '../../../components/RecipeList';
import ShowEditPlan from '../../../components/ShowEditPlan';
import ShowSearch from '../../../components/ShowSearch';
import styles from '../../../styles/Buttons.module.css';
import { useSearch, useRecipes } from '../../../lib/hooks';

import Link from 'next/link';


const EditPlan = () => {


  const [querySearch, setQuerySearch] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [recipeResults, setRecipeResults] = useState([]);
  const { data, error, isLoading } = useSearch(querySearch, readyToSubmit);
  const { recipes } = useRecipes();
  console.log('recipes from backend', recipes);
  // console.log('testestest');
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWZiMjFlMTUyMmIzNmI4MDAzNjQ1NmUiLCJpYXQiOjE2NDM4NDgxNzZ9.GAZVyB8olCwFAfgD_UQ5FVAbESxmjvCIJnNQi_4sJX8

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  }

  const submitSearch: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
    setReadyToSubmit(true);
  }

  const changeQuery: ChangeEventHandler = (e: ChangeEvent) => {
    const { value } = e.target as typeof e.target & {
      value: string;
    };
    setReadyToSubmit(false)
    setQuerySearch(value);
  };


  if (error) return (
    <div>Error or something, idk</div>
  )



  return (
    <div>
      {!isSearching
        ? <ShowEditPlan toggleSearch={toggleSearch} recipes={[]} />
        : <ShowSearch toggleSearch={toggleSearch} data={data} changeQuery={changeQuery} querySearch={querySearch} submitSearch={submitSearch} />}

    </div>
  )
}

export default EditPlan;