const CAMP_DAYS = 189;
const CHRISTMAS_DAYS = 23;
const TY1_CAMP_DAYS = 133;
const TY2_CAMP_DAYS = 56;
const ACC_PER_DAY = 27.5;
const DOWNTIME = 0.12;
const PERSONAL_ALLOWANCE = 12570;
const TAX_RATE = 0.26;
const GBP_CAD = 1.88;
const VISA_FEE = 340;
const IHS_TWO_YEARS = 776 * 2;
const FLIGHT_SEASON = 700;
const FLIGHT_XMAS = 900;
const TORONTO_FOOD_PER_DAY = 15;
const CANADA_SETUP = VISA_FEE + IHS_TWO_YEARS + FLIGHT_SEASON + FLIGHT_XMAS;

const ROTATIONS = {
  "3/1": { work: 3, rest: 1, label: "3 on / 1 off" },
  "4/1": { work: 4, rest: 1, label: "4 on / 1 off" },
  "5/2": { work: 5, rest: 2, label: "5 on / 2 off" },
};

const PACES = {
  low: {
    daily: 260,
    label: "Low of their range",
    detail:
      "Floor of what they published: 400 tubes at 65p, or 2,500 trees at 12p, mixed with some canes at 40p and day-rate.",
  },
  average: {
    daily: 375,
    label: "Mid of their range",
    detail: "Midpoint of their typical bands: ~500 tubes at 82p or 2,750 trees at 15p.",
  },
  strong: {
    daily: 450,
    label: "High of typical",
    detail: "Upper typical, not a hero day: ~550 tubes at 85p or 2,800 trees at 16p.",
  },
};

const FOOD = {
  tight: { work: 11, off: 8, label: "Tight Aldi", weekly: 70 },
  enough: { work: 15, off: 12, label: "Enough calories", weekly: 95 },
  hungry: { work: 20, off: 16, label: "Proper meals", weekly: 135 },
};

const state = {
  rotation: "4/1",
  pace: "low",
  food: "hungry",
};

function gbp(n) {
  return `£${Math.round(n).toLocaleString("en-GB")}`;
}

function cad(n) {
  return `C$${Math.round(n * GBP_CAD).toLocaleString("en-CA")}`;
}

function workDays(rotation) {
  const { work, rest } = ROTATIONS[rotation];
  const scheduled = CAMP_DAYS * (work / (work + rest));
  return Math.round(scheduled * (1 - DOWNTIME));
}

function taxOnProfit(profit) {
  if (profit <= PERSONAL_ALLOWANCE) return 0;
  return (profit - PERSONAL_ALLOWANCE) * TAX_RATE;
}

function season() {
  const work = workDays(state.rotation);
  const daily = PACES[state.pace].daily;
  const campOff = CAMP_DAYS - work;
  const foodUk = work * FOOD[state.food].work + campOff * FOOD[state.food].off;
  const foodToronto = CHRISTMAS_DAYS * TORONTO_FOOD_PER_DAY;
  const food = foodUk + foodToronto;
  const ty1Work = Math.round(work * (TY1_CAMP_DAYS / CAMP_DAYS));
  const ty2Work = work - ty1Work;
  const gross = work * daily;
  const acc = CAMP_DAYS * ACC_PER_DAY;
  const tax =
    taxOnProfit(ty1Work * daily - TY1_CAMP_DAYS * ACC_PER_DAY) +
    taxOnProfit(ty2Work * daily - TY2_CAMP_DAYS * ACC_PER_DAY);
  const pocket = gross - acc - food - CANADA_SETUP - tax;
  const scheduled = Math.round(
    CAMP_DAYS *
      (ROTATIONS[state.rotation].work /
        (ROTATIONS[state.rotation].work + ROTATIONS[state.rotation].rest)),
  );
  return {
    work,
    scheduled,
    daily,
    gross,
    acc,
    food,
    foodUk,
    foodToronto,
    tax,
    pocket,
    canada: CANADA_SETUP,
  };
}

function pills(id, entries, current, onPick) {
  const root = document.getElementById(id);
  root.innerHTML = "";
  for (const [key, item] of entries) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.label;
    btn.setAttribute("aria-pressed", String(key === current));
    btn.addEventListener("click", () => onPick(key));
    root.appendChild(btn);
  }
}

function render() {
  const s = season();
  pills("rotation-pills", Object.entries(ROTATIONS), state.rotation, (key) => {
    state.rotation = key;
    render();
  });
  pills("pace-pills", Object.entries(PACES), state.pace, (key) => {
    state.pace = key;
    render();
  });
  pills("food-pills", Object.entries(FOOD), state.food, (key) => {
    state.food = key;
    render();
  });

  document.getElementById("pace-detail").textContent =
    `${PACES[state.pace].detail} ${s.scheduled} scheduled days, 12% downtime → ${s.work} paid days. Food is ${FOOD[state.food].label.toLowerCase()} at about ${gbp(FOOD[state.food].weekly)}/week in the UK.`;

  document.getElementById("stats").innerHTML = `
    <div class="stat"><span class="value">${gbp(s.gross)}</span><span class="label">Season gross</span></div>
    <div class="stat warn"><span class="value">${gbp(s.canada)}</span><span class="label">Visa + IHS + two flights</span></div>
    <div class="stat"><span class="value">${gbp(s.acc + s.food)}</span><span class="label">Lodging + food</span></div>
    <div class="stat accent"><span class="value">${gbp(s.pocket)}</span><span class="label">Left after everything + tax</span></div>
  `;

  document.getElementById("cad-line").textContent =
    `In Canadian dollars (mid-market ~1.88): gross ${cad(s.gross)}, Canada setup ${cad(s.canada)}, in pocket ${cad(s.pocket)}.`;

  const rows = [
    ["Piecework gross", s.gross, false],
    ["Lodging + transport (£27.50 × 189 days)", -s.acc, true],
    ["Food in the UK (camp only)", -s.foodUk, true],
    ["Food in Toronto over Christmas", -s.foodToronto, true],
    ["Youth Mobility visa", -VISA_FEE, true],
    ["Immigration Health Surcharge (2 years)", -IHS_TWO_YEARS, true],
    ["Season return (Nov / May)", -FLIGHT_SEASON, true],
    ["Christmas return to Toronto", -FLIGHT_XMAS, true],
    ["Self-employed tax + Class 4 NI estimate", -s.tax, true],
    ["Left in your pocket", s.pocket, false],
  ];

  document.getElementById("breakdown").innerHTML = rows
    .map(([label, amount]) => {
      const shown = amount < 0 ? `−${gbp(Math.abs(amount))}` : gbp(amount);
      const shownCad = amount < 0 ? `−${cad(Math.abs(amount))}` : cad(amount);
      return `<tr><td>${label}</td><td>${shown}</td><td>${shownCad}</td></tr>`;
    })
    .join("");
}

render();
