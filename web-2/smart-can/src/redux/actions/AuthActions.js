export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email, credentials.password
        ).then( () => {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch( (err) => {
            dispatch({type: 'LOGIN_ERROR', err})
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then( () => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        });
    }
}

export const signUp = (user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            user.email, user.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: user.firstName,
                lastName: user.lastName,
                initials: user.firstName[0] + user.lastName[0]
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type:'SIGNUP_ERROR', error: err })
        });
    }
}

export const updateInfo = (info) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const user = getFirebase().auth().currentUser;
        const firestore = getFirestore();
console.log("Updating Stuff")
console.log(info)
        // Update Email if Provided
        if (info.email) {
            user.updateEmail(info.email).then(() => {
                    dispatch({ type: 'EMAIL_CHANGE_SUCCESS' })
                }).catch((err) => {
                    dispatch({ type: 'EMAIL_CHANGE_ERROR', error:err })
                })
        }
       
        // Update Username if Provided
        if (info.userName) {
            // Scan All Usernames to See if Claimed
            // TODO: Don't Download Everything
            var valid = true;
            firestore.collection('usernames').get().then(function(usernames) {
                usernames.forEach(function(name) {
                    if (name.data().userName == info.userName) {
                        valid = false;
                        dispatch({ type: 'USERNAME_CHANGE_ERROR', 
                            error: "Uh-oh. It looks like that username is taken."});
                    }
                })

                // Update Username if Not Taken
                if (valid) {
                    var batch = firestore.batch();
                    batch.update(firestore.collection('users').doc(user.uid),
                             {userName: info.userName})
                    batch.update(firestore.collection('usernames').doc(user.uid),
                             {userName: info.userName})
                    batch.update(firestore.collection('Spring2019').doc(user.uid),
                             {userName: info.userName})
                    batch.commit().then(
                        dispatch({ type: 'USERNAME_CHANGE_SUCCESS' })
                    ).catch( err => {
                        dispatch({ type: 'USERNAME_CHANGE_ERROR',
                                   error: err })
                    })
                }
            })
        }

        // Update First Name if Provided
        if (info.firstName) {
            firestore.collection('users').doc(user.uid).
                update({firstName: info.firstName}).then(() => {
                    dispatch({ type: 'FIRSTNAME_CHANGE_SUCCESS' })
                }).catch((err) => {
                    dispatch({ type: 'FIRSTNAME_CHANGE_ERROR', error:err })
                })
        }

        // Update Last Name if Provided
        if (info.lastName) {
            firestore.collection('users').doc(user.uid)
                .update({lastName: info.lastName}).then(() => {
                    dispatch({ type: 'LASTNAME_CHANGE_SUCCESS' })
                }).catch((err) => {
                    dispatch({ type: 'LASTNAME_CHANGE_ERROR', error:err })
                })
        }

        // Update Image if Provided
        if (info.image) {
            const urls = {
                Bulbasaur: "https://firebasestorage.googleapis.com/v0/b/nsbemon-firered.appspot.com/o/bulbasaur_large.png?alt=media&token=de022b27-3e5e-4225-bee4-8647ddc875cc",
                Charmander: "https://firebasestorage.googleapis.com/v0/b/nsbemon-firered.appspot.com/o/charmander_large.png?alt=media&token=0e792a63-842e-4635-bfaa-9aafb3c7563b",
                Squirtle: "https://firebasestorage.googleapis.com/v0/b/nsbemon-firered.appspot.com/o/squirtle_large.png?alt=media&token=07bb06e3-f894-4bc3-8a9b-a14d7fa480d8",
                Pikachu: "https://firebasestorage.googleapis.com/v0/b/nsbemon-firered.appspot.com/o/pikachu_large.png?alt=media&token=0d28c100-3b19-43f1-8e49-3dcc36406ff5"
            }
            firestore.collection('users').doc(user.uid)
                .update({
                    imageURL: urls[info.image],
                    imageName: info.image
                }).then(() => {
                    dispatch({ type: 'IMAGE_CHANGE_SUCCESS' });
                }).catch(() => {
                    dispatch({ type: 'IMAGE_CHANGE_ERROR' });
                })
        }
    }
}

export const clearAuthStatus = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch({type: 'CLEAR_STATUS'})
    }
}