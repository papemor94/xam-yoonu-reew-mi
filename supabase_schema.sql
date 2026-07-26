-- Script SQL d'initialisation de la table documents pour Supabase
-- A copier/coller et exécuter dans l'éditeur SQL de votre console Supabase.

-- 1. Création de la table documents si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.documents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    file_size TEXT NOT NULL,
    file_format TEXT NOT NULL DEFAULT 'PDF',
    published_date TEXT NOT NULL,
    file_url TEXT,
    author TEXT,
    drive_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Activation de la sécurité au niveau des lignes (RLS)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- 3. Création des politiques de sécurité
-- Politique pour permettre la lecture publique à tout le monde
CREATE POLICY "Allow public read access" ON public.documents
    FOR SELECT USING (true);

-- Politique pour permettre l'insertion de documents
CREATE POLICY "Allow public insert access" ON public.documents
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la modification de documents
CREATE POLICY "Allow public update access" ON public.documents
    FOR UPDATE USING (true) WITH CHECK (true);

-- Politique pour permettre la suppression de documents
CREATE POLICY "Allow public delete access" ON public.documents
    FOR DELETE USING (true);


-- ==========================================
-- 4. CRÉATION DE LA TABLE D'AUTHENTIFICATION
-- ==========================================

-- Création de la table admins si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.admins (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insertion des identifiants d'administration par défaut (login: admin_xyrm, mdp: xyrm&2026)
INSERT INTO public.admins (id, username, password)
VALUES ('admin-1', 'admin_xyrm', 'xyrm&2026')
ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;

-- Activation de RLS pour la table admins
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Autoriser la lecture publique (sélection) pour permettre la vérification des identifiants côté API
CREATE POLICY "Allow public read access on admins" ON public.admins
    FOR SELECT USING (true);

