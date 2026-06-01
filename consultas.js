// Consulta de quartos com vista para o jardim:

db.Quartos.find({
  "caracteristicas.vista": "jardim"})

// Consulta de quais hóspedes reservaram mais de uma vez?

db.Reservas.aggregate([
  {
    $group: {
      _id: "$hospede_id",
      quantidadeReservas: { $sum: 1 }
    }
  },
  {
    $match: {
      quantidadeReservas: { $gt: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      hospede_id: "$_id",
      quantidadeReservas: 1
    }
  }
])

// Quanto o hotel faturou em um período? Exemplo: "faturamento em abril", "faturamento anual", etc.

db.Pagamentos.aggregate([
  {
    $match: {
      status: "pago",
      data_pagamento: {
        $gte: "2025-04-01T00:00:00Z",
        $lt: "2025-05-01T00:00:00Z"
      }
    }
  },
  {
    $group: {
      _id: null,
      faturamentoTotal: {
        $sum: "$valor_total"
      }
    }
  }
])


// Quais períodos têm mais ocupação? Exemplo: "quais meses têm mais reservas?", "quais dias da semana são mais movimentados?", etc.

db.Reservas.aggregate([
  {
    $group: {
      _id: { $substr: ["$data_checkin", 5, 2] },
      totalReservas: { $sum: 1 }
    }
  },
  {
    $sort: { totalReservas: -1 }
  }
])
