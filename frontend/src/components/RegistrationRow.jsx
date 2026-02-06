import React from "react";

const RegistrationRow = ({
  registration,
  isSaving,
  onToggleAttended,
  onToggleCertificate,
}) => {
  return (
    <tr>
      <td>{registration.name}</td>
      <td>{registration.phone}</td>
      <td>{registration.email}</td>
      <td>{new Date(registration.createdAt).toLocaleString()}</td>

      <td>
        <input
          type="checkbox"
          checked={!!registration.attended}
          disabled={isSaving}
          onChange={() => onToggleAttended(registration)}
        />
      </td>

      <td>
        <input
          type="checkbox"
          checked={!!registration.certificateIssued}
          disabled={isSaving}
          onChange={() => onToggleCertificate(registration)}
        />
      </td>
    </tr>
  );
};

export default RegistrationRow;
