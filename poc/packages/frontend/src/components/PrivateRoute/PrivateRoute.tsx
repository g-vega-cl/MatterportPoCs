import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

import { isAuthenticated } from "../../utils/utils";

interface IPrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

const PrivateRoute = (props: IPrivateRouteProps) => {
  const { component: Component, ...rest }: IPrivateRouteProps = props;
  const renderComponent: RenderComponent = (props) => {
    return isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/auth",
        }}
      />
    );
  };

  return <Route {...rest} render={renderComponent} />;
};

export default PrivateRoute;
