import { MouseEventHandler } from "react";
import DoughnutChart from "./DoughnutChart";
import styles from '../styles/Buttons.module.css';
import { useRecipes } from '../lib/hooks';
import RecipeList from './RecipeList';
import { Recipe } from '../db/types';

type ShowEditPlanProps = {
  toggleSearch: MouseEventHandler,
  recipes: Recipe[]
}

const ShowEditPlan = ({ recipes, toggleSearch }: ShowEditPlanProps) => {

  return (
    <>
      <h1>Edit my Plan</h1>
      <DoughnutChart
        remainingBudget={300}
        amountSpent={100}
      />
      <button className={styles.loginBtn} type='button' onClick={toggleSearch}>Add recipe</button>
      <RecipeList recipes={recipes} />
      <button className={styles.loginBtn} type='submit'>Confirm plan</button>
    </>
  )
}

export default ShowEditPlan;