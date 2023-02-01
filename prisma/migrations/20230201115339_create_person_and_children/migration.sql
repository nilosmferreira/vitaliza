-- CreateTable
CREATE TABLE "type_persons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "zip" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "distrinct" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "addresses_person" (
    "person_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,

    PRIMARY KEY ("person_id", "address_id"),
    CONSTRAINT "addresses_person_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "addresses_person_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "cellphone" TEXT
);

-- CreateTable
CREATE TABLE "contacts_person" (
    "contact_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,

    PRIMARY KEY ("contact_id", "person_id"),
    CONSTRAINT "contacts_person_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contacts_person_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BankData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code_bank" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "document" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "datas_bank_person" (
    "person_id" TEXT NOT NULL,
    "bank_data_id" TEXT NOT NULL,

    PRIMARY KEY ("person_id", "bank_data_id"),
    CONSTRAINT "datas_bank_person_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "datas_bank_person_bank_data_id_fkey" FOREIGN KEY ("bank_data_id") REFERENCES "BankData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type_person_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "corporate_name" TEXT,
    "surname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "cellphone" TEXT,
    "corporate_phone" TEXT,
    CONSTRAINT "persons_type_person_id_fkey" FOREIGN KEY ("type_person_id") REFERENCES "type_persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
