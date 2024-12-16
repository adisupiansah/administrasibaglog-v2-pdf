/*
  Warnings:

  - A unique constraint covering the columns `[type_notadinas]` on the table `notadinas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `notadinas` ADD COLUMN `type_notadinas` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `type_notadinas` ON `notadinas`(`type_notadinas`);
