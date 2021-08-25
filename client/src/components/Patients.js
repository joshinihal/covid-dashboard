import React from "react";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useCallback, useState } from "react";
import Card from "./UI/Card";
import classes from './Patients.module.css'

const PATIENTS_QUERY = gql`
  query PatientsQuery {
    patients {
      cases
      date
      status
    }
  }
`;

const PATIENTS_QUERY_BY_DATE = gql`
  query PatientsQueryByDate($month: String!) {
    patientsbydate(month: $month) {
      cases
      date
      status
    }
  }
`;

const Patients = () => {

  const [currentActiveCases, setCurrentActiveCases] = useState(0);
  const [lastMonthActiveCases, setLastMonthActiveCases] = useState(0);
  const [estimatedActiveCases, setEstimatedActiveCases] = useState(0);

  // const { loading, error, data } = useQuery(PATIENTS_QUERY_BY_DATE, {
  //   variables: {month: "/06/"},
  // });

  const [getData, { loading, error, data }] = useLazyQuery(
    PATIENTS_QUERY_BY_DATE
  );

  const getMonthWiseData = useCallback(
    (monthType) => {
      console.log('month type is', monthType)
      const tempMonth = new Date().getMonth();
      let month;
      let prefix = "";
      // add zero if using current month since months start from 0
      if (monthType === "previous") {
        if (tempMonth < 10) {
          prefix = "0";
        }
        month = prefix + tempMonth;
      } else {
        if (tempMonth + 1 < 10) {
          prefix = "0";
        }
        month = prefix + (tempMonth + 1);
      }
      const dateParam = `/${month}/2020`;
      getData({
        variables: { month: dateParam },
        fetchPolicy: 'network-only'
      });
      if (data) {
        let result = {
          totalCases: 0,
          totalRecovered: 0,
          totalHospitalized: 0,
          totalDeseased: 0,
        };
        data.patientsbydate.forEach((element) => {
          result.totalCases = result.totalCases + Number(element.cases);
          if (element.status === "Hospitalized") {
            result.totalHospitalized =
              result.totalHospitalized + Number(element.cases);
          } else if (element.status === "Recovered") {
            result.totalRecovered =
              result.totalRecovered + Number(element.cases);
          } else {
            result.totalDeseased = result.totalDeseased + Number(element.cases);
          }
        });
        return result;
      }
    },
    [getData, data]
  );

  useEffect(() => {
    const currentCases = getMonthWiseData("current");
    console.log('current', currentCases);
    if (currentCases){
      setCurrentActiveCases(currentCases.totalCases);
    };
  }, [getMonthWiseData]);

  useEffect(() => {
    const lastMonthCases = getMonthWiseData("previous");
    console.log('last month', lastMonthCases);
    if (lastMonthCases) {
      setLastMonthActiveCases(lastMonthCases.totalCases);
    };

  }, [getMonthWiseData]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1 className="display-4 my-3">Patients</h1>
      <div className={classes["cards-container"]}>
      <Card heading='Month to Date Active Cases' count={currentActiveCases}></Card>
      <Card heading='Last Month Active Cases' count={lastMonthActiveCases}></Card>
      <Card heading='Estimated Month End Cases' count={estimatedActiveCases}></Card>
      </div>
    </div>
  );
};

export default Patients;
