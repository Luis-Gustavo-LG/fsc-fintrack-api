CREATE VIEW user_balance AS
SELECT
  "userId",

  COALESCE(
    SUM("amountInCents") FILTER (WHERE "type" = 'EARNING'),
    0
  ) AS earnings,

  COALESCE(
    SUM("amountInCents") FILTER (WHERE "type" = 'EXPENSE'),
    0
  ) AS expenses,

  COALESCE(
    SUM("amountInCents") FILTER (WHERE "type" = 'INVESTMENT'),
    0
  ) AS investments,

  (
    COALESCE(SUM("amountInCents") FILTER (WHERE "type" = 'EARNING'), 0)
    +
    COALESCE(SUM("amountInCents") FILTER (WHERE "type" = 'INVESTMENT'), 0)
    -
    COALESCE(SUM("amountInCents") FILTER (WHERE "type" = 'EXPENSE'), 0)
  ) AS balance

FROM "Transaction"
GROUP BY "userId";
