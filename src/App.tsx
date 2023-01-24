import "./styles.css";
import mock from "./mock";
import { handlePhone } from "./utils";
import React from "react";

interface MockType {
  [key: string]: any;
}

interface PhoneNumberProps {
  deliveryUnitResponsible?: phoneNumberInfoProps;
  billingResponsible?: phoneNumberInfoProps;
  orderResponsible?: phoneNumberInfoProps;
  masterResponsible?: phoneNumberInfoProps;
}

interface phoneNumbersArray {
  id: string;
  phoneNumber: {
    phoneType: string;
    countryCode: string;
    zoneCode: string;
    extensionPhone: string;
    extensionLine: string;
  };
}

interface phoneNumberInfoProps {
  id: string;
  cpf: string;
  rg: string;
  name: string;
  jobTitle: string;
  isActive: boolean;
  email: string;
  gender: string;
  birthDate: string;
  phoneNumbers: phoneNumbersArray[];
  phoneNumbersParse: {
    MobilePhone?: string;
    CommercialPhone?: string;
  };
}

export default function App() {
  const [phoneNumber, setPhoneNumber] = React.useState<PhoneNumberProps>({});
  const newMock: MockType = mock;
  React.useEffect(() => {
    Object.keys(mock).forEach((key) => {
      const newPhoneNumber = newMock[key].phoneNumbers.map((item: any) => {
        const newPhone = handlePhone(
          item.phoneNumber.zoneCode,
          item.phoneNumber.extensionPhone
        );
        return {
          type: item.phoneNumber.phoneType,
          number: newPhone
        };
      });
      const phoneNumberObject = newPhoneNumber.reduce(
        (obj: any, item: any) => ({ ...obj, [item.type]: item.number }),
        {}
      );
      newMock[key] = { ...newMock[key], phoneNumbersParse: phoneNumberObject };
      setPhoneNumber(newMock);
    });
  }, [newMock]);

  return (
    <>
      <div>
        MobilePhone:
        {phoneNumber?.deliveryUnitResponsible?.phoneNumbersParse?.MobilePhone}
      </div>
      <div>
        CommercialPhone:
        {
          phoneNumber?.deliveryUnitResponsible?.phoneNumbersParse
            ?.CommercialPhone
        }
      </div>
    </>
  );
}
