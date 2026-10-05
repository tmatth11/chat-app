CREATE TABLE "public"."profiles" (
  "id" uuid PRIMARY KEY NOT NULL REFERENCES "auth"."users" ON DELETE CASCADE,
  "username" text UNIQUE NOT NULL
);

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON "public"."profiles" FOR SELECT TO public USING (true);

CREATE FUNCTION "public"."handle_new_user"()
RETURNS trigger
AS $pga$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data ->> 'username');
  return new;
END;
$pga$
VOLATILE
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = '';

CREATE TRIGGER "after_user_created"
  AFTER INSERT ON "auth"."users"
  FOR EACH ROW
  EXECUTE PROCEDURE "public"."handle_new_user"();