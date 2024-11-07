export default function handleErrorCode(errorCode: number) {
  switch (errorCode) {
    case 1703:
      return "Invalid value in username or password field";
    case 1704:
      return "Invalid value in ‘type’ field";
    case 1705:
      return "Invalid Message";
    case 1706:
      return "Invalid Destination";
    case 1707:
      return "Invalid Source (Sender)";
    case 1708:
      return "Invalid value for ‘dlr’ field";
    case 1709:
      return "User validation failed";
    case 1710:
      return "Internal Error";
    case 1025:
      return "Insufficient Credit User";
    case 1026:
      return "Insufficient Credit Reseller";
    default:
      return "Unknown Error";
  }
}
