DROP VIEW IF EXISTS user_balance;

CREATE VIEW user_balance AS
SELECT
  "userId",

  COALESCE(
    SUM("amountInCents") FILTER (WHERE "type" = 'EARNING'),
    0
  )::INT AS earnings,

  COALESCE(
    SUM("amountInCents") FILTER (WHERE "type" = 'EXPENSE'),
    0
  )::INT AS expenses,

  COALESCE(
    SUM("amountInCents") FILTER (WHERE "type" = 'INVESTMENT'),
    0
  )::INT AS investments,

  (
    COALESCE(SUM("amountInCents") FILTER (WHERE "type" = 'EARNING'), 0)
    -
    COALESCE(SUM("amountInCents") FILTER (WHERE "type" = 'INVESTMENT'), 0)
    -
    COALESCE(SUM("amountInCents") FILTER (WHERE "type" = 'EXPENSE'), 0)
  )::INT AS balance

FROM "Transaction"
GROUP BY "userId";
