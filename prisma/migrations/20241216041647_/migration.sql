/*
  Warnings:

  - Added the required column `notadinas_pdf` to the `notadinas` table without a default value. This is not possible if the table is not empty.
  - Made the column `type_notadinas` on table `notadinas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `type_notadinas` ON `notadinas`;

-- AlterTable
ALTER TABLE `notadinas` ADD COLUMN `notadinas_pdf` VARCHAR(255) NOT NULL,
    MODIFY `type_notadinas` VARCHAR(100) NOT NULL;
