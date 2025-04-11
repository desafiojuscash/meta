import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Case = sequelize.define("Case", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    caseNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      default: "",
    },
    accused: {
      type: DataTypes.STRING,
      allowNull: true,
      default: 'Instituto Nacional do Seguro Social - INSS'
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: true,
      default: "",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      default: "",
    },
    principalGrossNet: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lateInterest: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    legalFees: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("todo", "doing", "review", "done"),
      allowNull: false,
      defaultValue: "todo",
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    hooks: {
      beforeSave: (caseInstance) => {
        if (!caseInstance.accused) {
          caseInstance.accused = 'Instituto Nacional do Seguro Social - INSS';
        }
        if (caseInstance.authors) {
          caseInstance.authors = caseInstance.authors.toLowerCase();
        }
      }
    },
    indexes: [
      {
        name: "idx_case_authors",
        fields: ["authors"]
      },
      {
        name: "idx_case_status",
        fields: ["status"]
      },
      {
        name: "idx_case_publication_date",
        fields: ["publicationDate"]
      }
    ]
  });

  return Case;
};
