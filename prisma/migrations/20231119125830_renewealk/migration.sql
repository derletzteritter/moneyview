/*
  Warnings:

  - Added the required column `renewal` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subscription` ADD COLUMN `renewal` VARCHAR(191) NOT NULL;
