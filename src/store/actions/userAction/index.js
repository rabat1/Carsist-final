function updateUser(user)
{
  console.log('action calleddddd ->', user)
  return {
    type: 'UPDATE_USER', //constant strings
    data: user

  }
}

export {
    updateUser
  }