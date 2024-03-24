import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddMoneyRequests from '../components/AddMoneyRequests';
import WithdrawMoneyRequest from '../components/WithdrawMoneyRequest';

const Tab = createMaterialTopTabNavigator();

function TopTabNav() {
  return (
    <Tab.Navigator
      style={{
        marginTop: 20,
        backgroundColor: 'white',
        elevation: 0,
        height: 50,
      }}
    >
      <Tab.Screen name="Add Requests" component={AddMoneyRequests} />
      <Tab.Screen name="Withdraw Requests" component={WithdrawMoneyRequest} />
    </Tab.Navigator>
  );
}

export default TopTabNav;
