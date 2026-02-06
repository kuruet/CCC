import React from "react";
import RegistrationRow from "./RegistrationRow";

const RegistrationTable = ({
  registrations,
  savingMap,
  onToggleAttended,
  onToggleCertificate,
}) => {
  return (
    <table width="100%" border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Registered At</th>
          <th>Attended</th>
          <th>Certificate</th>
        </tr>
      </thead>
      <tbody>
        {registrations.map((reg) => (
          <RegistrationRow
            key={reg._id}
            registration={reg}
            isSaving={!!savingMap[reg._id]}
            onToggleAttended={onToggleAttended}
            onToggleCertificate={onToggleCertificate}
          />
        ))}
      </tbody>
    </table>
  );
};

export default RegistrationTable;
