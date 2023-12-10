export async function decreaseUserBalance(user: any) {
  const updatedBalance = user.balance - 10000;
  if (updatedBalance >= 0) {
    user.balance = updatedBalance;
    await user.save();
    return true;
  } else {
    return false;
  }
}