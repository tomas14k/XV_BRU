-- CreateEnum
CREATE TYPE "PrivacyType" AS ENUM ('privada', 'publica');

-- CreateTable
CREATE TABLE "Organizer" (
    "id_organizer" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id_organizer")
);

-- CreateTable
CREATE TABLE "Event" (
    "id_event" TEXT NOT NULL,
    "id_organizer" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "event_type" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'pendiente',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "QrSetup" (
    "id_qr" TEXT NOT NULL,
    "id_event" TEXT NOT NULL,
    "title_card" TEXT,
    "subtitle_card" TEXT,
    "font_type" TEXT,
    "size_text" INTEGER,
    "color_text" TEXT,
    "color_background" TEXT,

    CONSTRAINT "QrSetup_pkey" PRIMARY KEY ("id_qr")
);

-- CreateTable
CREATE TABLE "GuestUISetup" (
    "id_guest_UI_setup" TEXT NOT NULL,
    "id_event" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "font_type" TEXT,
    "color_text" TEXT,
    "color_background" TEXT,
    "background_image" TEXT,

    CONSTRAINT "GuestUISetup_pkey" PRIMARY KEY ("id_guest_UI_setup")
);

-- CreateTable
CREATE TABLE "TransmissionSetup" (
    "id_transmission_setup" TEXT NOT NULL,
    "id_event" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "time_btw_pics" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "TransmissionSetup_pkey" PRIMARY KEY ("id_transmission_setup")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id_gallery" TEXT NOT NULL,
    "id_event" TEXT NOT NULL,
    "link_token" TEXT,
    "privacy" "PrivacyType" NOT NULL DEFAULT 'privada',

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id_gallery")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id_photo" TEXT NOT NULL,
    "id_event" TEXT NOT NULL,
    "id_gallery" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "message" TEXT,
    "autor_name" TEXT,
    "state" TEXT NOT NULL DEFAULT 'pendiente',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id_photo")
);

-- CreateTable
CREATE TABLE "IdleImage" (
    "id_idle_image" TEXT NOT NULL,
    "id_event" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER,

    CONSTRAINT "IdleImage_pkey" PRIMARY KEY ("id_idle_image")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_email_key" ON "Organizer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "QrSetup_id_event_key" ON "QrSetup"("id_event");

-- CreateIndex
CREATE UNIQUE INDEX "GuestUISetup_id_event_key" ON "GuestUISetup"("id_event");

-- CreateIndex
CREATE UNIQUE INDEX "TransmissionSetup_id_event_key" ON "TransmissionSetup"("id_event");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_id_event_key" ON "Gallery"("id_event");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_link_token_key" ON "Gallery"("link_token");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_id_organizer_fkey" FOREIGN KEY ("id_organizer") REFERENCES "Organizer"("id_organizer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrSetup" ADD CONSTRAINT "QrSetup_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestUISetup" ADD CONSTRAINT "GuestUISetup_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransmissionSetup" ADD CONSTRAINT "TransmissionSetup_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_id_gallery_fkey" FOREIGN KEY ("id_gallery") REFERENCES "Gallery"("id_gallery") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdleImage" ADD CONSTRAINT "IdleImage_id_event_fkey" FOREIGN KEY ("id_event") REFERENCES "Event"("id_event") ON DELETE RESTRICT ON UPDATE CASCADE;
