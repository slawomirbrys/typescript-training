/// <reference path="data.ts" />

const API = (function(){

  const timeout = () => Math.random() * 100

  const wrapWithPromise = (fn: Function) =>
    (...args) => {
      return new Promise((resolve, reject) =>
        setTimeout(() => resolve(fn(...args)), timeout())
      )
    }

  const getUser: (id: number) => Promise<User>
    = wrapWithPromise(db.getUserById);

  const getUsersByNationality: (nat: Nationality) => Promise<User[]>
    = wrapWithPromise(db.getUsersByNationality);

  const getNationalities: () => Promise<Nationality[]>
    = wrapWithPromise(db.getNationalities)

  return {
    // getUser(id): thenable
    getUser,
    // getUsersByNationality(nationality): thenable
    getUsersByNationality,
    // getNationalities(): thenable
    getNationalities,
  }
}());
