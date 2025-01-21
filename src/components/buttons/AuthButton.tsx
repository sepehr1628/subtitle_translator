interface AuthButtonProps {
  type: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ type }) => {
  return <button className={`button button_${type}`}>{type}</button>;
};

export default AuthButton;
