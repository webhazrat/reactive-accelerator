import React from "react";

export default function Field({ label, children, error }) {
  const id = getChildId(children);
  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-400">
          {error.message}
        </div>
      )}
    </div>
  );
}

function getChildId(children) {
  const child = React.Children.only(children);
  if ("id" in child?.props) {
    return child.props.id;
  }
}
