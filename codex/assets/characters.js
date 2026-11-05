// 经典银幕人物半身像。角色均避开恐怖、惊悚题材。
const characterFigures = [
  {
    name: "默片旅行者",
    markup: `
      <svg viewBox="0 0 300 480" fill="none" aria-hidden="true">
        <path class="char-dark" d="M93 289C105 271 121 262 148 262C176 262 197 274 207 294L226 423H69L93 289Z"/>
        <path class="char-dark" d="M115 415L109 475H139L148 394L158 475H188L177 415H115Z"/>
        <path d="M116 277L91 400M181 277L208 402" stroke="var(--char-mid)" stroke-width="18" stroke-linecap="round"/>
        <circle class="char-light" cx="95" cy="406" r="10"/>
        <circle class="char-light" cx="208" cy="408" r="10"/>
        <path d="M222 235L250 459" stroke="var(--char-line)" stroke-width="5" stroke-linecap="round"/>
        <path d="M239 459C245 471 255 471 259 458" stroke="var(--char-line)" stroke-width="5" stroke-linecap="round"/>
        <ellipse class="char-light" cx="150" cy="164" rx="39" ry="48"/>
        <path class="char-mid" d="M116 153C120 126 132 116 149 116C169 116 181 129 183 154C167 144 134 143 116 153Z"/>
        <ellipse class="char-dark" cx="151" cy="103" rx="57" ry="12"/>
        <path class="char-dark" d="M113 102C118 72 130 63 151 63C173 63 184 76 188 102H113Z"/>
        <circle class="char-line" cx="136" cy="159" r="2.5"/>
        <circle class="char-line" cx="164" cy="159" r="2.5"/>
        <path d="M149 162L146 177H152" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path d="M130 190C141 195 159 195 170 189" stroke="var(--char-line)" stroke-width="7" stroke-linecap="round"/>
        <path d="M135 223C143 235 158 235 166 222" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path class="char-light" d="M137 263L151 292L166 262L151 302L137 263Z"/>
        <circle class="char-highlight" cx="151" cy="321" r="4"/>
        <circle class="char-highlight" cx="151" cy="348" r="4"/>
      </svg>`,
  },
  {
    name: "黄金时代飞行员",
    markup: `
      <svg viewBox="0 0 300 480" fill="none" aria-hidden="true">
        <path class="char-dark" d="M65 480L85 309C94 279 120 264 151 264C184 264 209 281 218 311L239 480H65Z"/>
        <path class="char-mid" d="M92 314C113 298 130 292 150 292C172 292 190 299 209 314L194 372H82L92 314Z"/>
        <path d="M99 286L195 452M201 286L103 452" stroke="var(--char-line)" stroke-width="3" stroke-opacity=".5"/>
        <path class="char-gold" d="M84 294C106 309 123 315 149 315C175 315 195 307 216 293L229 329C207 351 182 364 149 364C117 364 90 350 72 327L84 294Z"/>
        <ellipse class="char-light" cx="149" cy="174" rx="38" ry="48"/>
        <path class="char-mid" d="M111 166C111 128 128 107 150 107C175 107 191 127 190 166C177 149 125 149 111 166Z"/>
        <ellipse class="char-dark" cx="149" cy="120" rx="51" ry="17"/>
        <path class="char-dark" d="M104 118C107 91 126 79 150 79C173 79 193 93 197 120H104Z"/>
        <path class="char-light" d="M111 158C126 136 175 136 189 158L183 181C166 164 132 164 116 181L111 158Z"/>
        <path d="M110 164C126 147 174 147 190 164" stroke="var(--char-line)" stroke-width="3"/>
        <circle cx="133" cy="170" r="10" fill="var(--char-line)" fill-opacity=".45"/>
        <circle cx="166" cy="170" r="10" fill="var(--char-line)" fill-opacity=".45"/>
        <path d="M149 181L146 193H152" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path d="M137 213C145 218 157 218 164 213" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path class="char-gold" d="M104 264C91 302 74 336 50 369C67 374 81 368 91 353L124 285L104 264Z"/>
      </svg>`,
  },
  {
    name: "远航宇航员",
    markup: `
      <svg viewBox="0 0 300 480" fill="none" aria-hidden="true">
        <circle class="char-dark" cx="151" cy="147" r="93"/>
        <circle class="char-mid" cx="151" cy="147" r="77"/>
        <path class="char-light" d="M91 131C104 86 136 67 169 78C195 87 211 110 211 139C181 124 131 120 91 131Z" fill-opacity=".72"/>
        <path d="M107 119C120 94 140 84 160 86" stroke="var(--char-highlight)" stroke-width="9" stroke-linecap="round" opacity=".55"/>
        <path class="char-dark" d="M58 480L76 303C87 271 112 254 149 254C187 254 215 272 225 305L242 480H58Z"/>
        <path class="char-mid" d="M77 315C101 295 197 295 224 315L209 391H91L77 315Z"/>
        <path class="char-light" d="M112 330H188V375H112V330Z" fill-opacity=".3"/>
        <circle class="char-gold" cx="132" cy="345" r="7"/>
        <circle class="char-gold" cx="155" cy="345" r="7"/>
        <circle class="char-gold" cx="178" cy="345" r="7"/>
        <path d="M113 374H187" stroke="var(--char-line)" stroke-width="2" opacity=".4"/>
        <path class="char-dark" d="M55 315C33 342 30 389 48 421C60 440 82 449 98 440L111 400L84 385L85 344L55 315Z"/>
        <path class="char-dark" d="M230 315C251 342 252 389 235 420C224 439 201 449 186 440L173 400L202 383L200 344L230 315Z"/>
        <path class="char-dark" d="M102 470L92 480H136L144 411L152 480H196L184 469L173 389H111L102 470Z"/>
      </svg>`,
  },
  {
    name: "银幕探险家",
    markup: `
      <svg viewBox="0 0 300 480" fill="none" aria-hidden="true">
        <path class="char-dark" d="M64 480L80 319C91 282 119 263 151 263C185 263 211 281 221 316L239 480H64Z"/>
        <path class="char-mid" d="M94 316L117 287L150 311L183 287L207 319L197 377H103L94 316Z"/>
        <path class="char-gold" d="M106 294C119 308 132 313 150 313C168 313 182 308 195 294L203 330C188 350 169 358 150 358C131 358 112 349 97 330L106 294Z"/>
        <path d="M101 301L202 453" stroke="var(--char-line)" stroke-width="14" opacity=".38"/>
        <path class="char-mid" d="M197 376L241 438L206 470L177 408L197 376Z"/>
        <ellipse class="char-light" cx="150" cy="179" rx="38" ry="47"/>
        <path class="char-mid" d="M113 170C119 134 134 119 151 119C170 119 185 135 188 166C168 155 133 156 113 170Z"/>
        <ellipse class="char-dark" cx="150" cy="112" rx="66" ry="13"/>
        <path class="char-dark" d="M101 113C108 80 124 68 149 68C175 68 193 84 199 113H101Z"/>
        <path class="char-dark" d="M113 106C111 92 122 84 142 84C164 84 178 93 181 109H113Z"/>
        <circle class="char-line" cx="136" cy="171" r="2.3"/>
        <circle class="char-line" cx="164" cy="171" r="2.3"/>
        <path d="M149 176L146 190H152" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path d="M140 207C147 211 155 211 162 207" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  },
  {
    name: "西部旅人",
    markup: `
      <svg viewBox="0 0 300 480" fill="none" aria-hidden="true">
        <path class="char-dark" d="M48 480L81 300C92 268 117 251 149 251C183 251 209 269 220 302L250 480H48Z"/>
        <path class="char-gold" d="M77 302C93 278 119 263 149 263C180 263 207 278 225 305L204 409C184 430 112 430 90 407L77 302Z"/>
        <path d="M84 322L218 452M218 322L84 452" stroke="var(--char-line)" stroke-width="3" opacity=".3"/>
        <ellipse class="char-light" cx="150" cy="175" rx="38" ry="49"/>
        <path class="char-mid" d="M112 169C116 132 132 118 151 118C172 118 187 133 190 166C170 153 132 154 112 169Z"/>
        <path class="char-dark" d="M84 119C87 86 108 64 150 64C191 64 212 88 216 119C179 111 120 110 84 119Z"/>
        <ellipse class="char-dark" cx="150" cy="119" rx="82" ry="14"/>
        <path class="char-mid" d="M114 196C124 220 140 231 150 231C161 231 176 220 187 196L181 251H120L114 196Z"/>
        <path d="M129 198C139 203 161 203 171 198" stroke="var(--char-line)" stroke-width="5" stroke-linecap="round"/>
        <circle class="char-line" cx="136" cy="170" r="2.3"/>
        <circle class="char-line" cx="164" cy="170" r="2.3"/>
        <path d="M149 176L146 190H152" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path class="char-gold" d="M78 302C61 345 49 393 54 438C65 449 82 450 96 440L111 369L91 341L78 302Z"/>
      </svg>`,
  },
  {
    name: "夜幕旅人",
    markup: `
      <svg viewBox="0 0 320 480" fill="none" aria-hidden="true">
        <path class="char-dark" d="M63 480L83 293C95 264 121 248 151 248C183 248 208 264 219 296L241 480H63Z"/>
        <path class="char-mid" d="M99 277L125 254L151 278L176 254L204 278L193 376H108L99 277Z"/>
        <path class="char-light" d="M124 266L151 321L178 266L167 350H136L124 266Z" fill-opacity=".55"/>
        <ellipse class="char-light" cx="151" cy="167" rx="36" ry="47"/>
        <path class="char-mid" d="M115 162C121 127 135 112 151 112C169 112 182 128 186 160C169 149 134 149 115 162Z"/>
        <ellipse class="char-dark" cx="151" cy="108" rx="59" ry="11"/>
        <path class="char-dark" d="M111 108C117 80 128 69 151 69C173 69 186 82 190 108H111Z"/>
        <circle class="char-line" cx="138" cy="164" r="2.4"/>
        <circle class="char-line" cx="163" cy="164" r="2.4"/>
        <path d="M150 170L147 184H153" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path d="M140 204C147 207 155 207 162 204" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path d="M215 253L272 458" stroke="var(--char-line)" stroke-width="5" stroke-linecap="round"/>
        <path class="char-dark" d="M178 132C209 120 251 131 278 161C247 167 225 178 198 180C185 166 177 151 178 132Z"/>
        <path d="M277 161C286 171 286 181 276 189" stroke="var(--char-line)" stroke-width="4" stroke-linecap="round"/>
        <path class="char-dark" d="M102 475L93 480H136L144 413L153 480H195L184 474L171 388H111L102 475Z"/>
      </svg>`,
  },
  {
    name: "银幕旅人",
    markup: `
      <svg viewBox="0 0 340 390" fill="none" aria-hidden="true">
        <circle cx="77" cy="315" r="48" stroke="var(--char-line)" stroke-width="6" opacity=".45"/>
        <circle cx="269" cy="315" r="48" stroke="var(--char-line)" stroke-width="6" opacity=".45"/>
        <path d="M77 315L145 218L210 315H269M145 218L180 141M145 218L231 223" stroke="var(--char-line)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>
        <ellipse class="char-light" cx="195" cy="106" rx="29" ry="36"/>
        <path class="char-mid" d="M169 102C173 75 183 64 197 64C214 64 223 78 224 104C210 94 186 94 169 102Z"/>
        <path class="char-dark" d="M166 140C177 128 218 127 229 141L246 228H157L166 140Z"/>
        <path class="char-gold" d="M180 135C191 150 207 151 218 136L220 181H181L180 135Z"/>
        <path class="char-dark" d="M171 180L210 153L223 230L193 245L171 180Z" opacity=".72"/>
        <path d="M182 113C188 109 195 109 201 113" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path class="char-gold" d="M205 144C225 155 233 177 224 196C216 176 204 166 190 160L205 144Z"/>
      </svg>`,
  },
  {
    name: "经典银幕女士",
    markup: `
      <svg viewBox="0 0 300 480" fill="none" aria-hidden="true">
        <path class="char-dark" d="M80 480C89 373 109 317 149 317C190 317 211 373 220 480H80Z"/>
        <path class="char-gold" d="M103 480C107 386 119 333 149 333C180 333 193 386 198 480H103Z" opacity=".48"/>
        <path class="char-dark" d="M104 300C112 272 126 256 149 256C173 256 188 273 197 300L188 353C177 369 121 369 109 353L104 300Z"/>
        <path class="char-light" d="M120 282C129 266 141 258 149 258C159 258 171 267 179 282L175 319H123L120 282Z"/>
        <ellipse class="char-light" cx="149" cy="175" rx="37" ry="47"/>
        <path class="char-mid" d="M111 168C112 132 130 111 151 111C175 111 190 130 189 169C170 149 129 149 111 168Z"/>
        <path class="char-dark" d="M108 137C119 109 134 96 153 96C171 96 188 110 194 137C176 115 137 115 108 137Z"/>
        <path class="char-dark" d="M111 140C99 153 99 190 112 210C114 186 120 169 132 156L111 140Z"/>
        <path class="char-dark" d="M187 140C198 153 198 190 186 210C184 186 178 169 166 156L187 140Z"/>
        <circle class="char-gold" cx="123" cy="203" r="4"/>
        <circle class="char-gold" cx="175" cy="203" r="4"/>
        <circle class="char-line" cx="136" cy="174" r="2.3"/>
        <circle class="char-line" cx="162" cy="174" r="2.3"/>
        <path d="M149 180L146 192H153" stroke="var(--char-line)" stroke-width="2" stroke-linecap="round"/>
        <path d="M137 208C145 213 157 213 165 207" stroke="var(--char-line)" stroke-width="3" stroke-linecap="round"/>
        <path class="char-light" d="M109 326C88 341 71 366 63 400L84 422C98 390 113 370 128 360L109 326Z"/>
        <path class="char-light" d="M190 326C211 341 228 366 236 400L215 422C201 390 186 370 171 360L190 326Z"/>
      </svg>`,
  },
];

const placements = [
  { side: "right", offset: "-6rem", vertical: "top", verticalOffset: "18vh" },
  { side: "left", offset: "-10rem", vertical: "bottom", verticalOffset: "5vh" },
  { side: "right", offset: "-7rem", vertical: "bottom", verticalOffset: "4vh" },
  { side: "left", offset: "-11rem", vertical: "top", verticalOffset: "42vh" },
];

const mobilePlacements = [
  { side: "right", offset: "-2.5rem", vertical: "top", verticalOffset: "20vh" },
  { side: "left", offset: "-3rem", vertical: "bottom", verticalOffset: "6vh" },
];

const shuffled = (items) => [...items].sort(() => Math.random() - 0.5);

const buildCharacters = () => {
  const layer = document.querySelector("[data-character-layer]");
  if (!layer) return;

  const previous = window.sessionStorage.getItem("film-character-combo");
  const count = window.innerWidth < 768 ? 1 : Math.random() > 0.45 ? 2 : 1;
  const figurePool = shuffled(characterFigures);
  const placementPool = shuffled(window.innerWidth < 768 ? mobilePlacements : placements);
  const selection = figurePool.slice(0, count);
  let combination = selection.map((figure) => figure.name).join(":");

  if (combination === previous && figurePool.length > count) {
    selection[selection.length - 1] = figurePool.find((figure) => !selection.includes(figure));
    combination = selection.map((figure) => figure.name).join(":");
  }

  layer.replaceChildren(
    ...selection.map((figure, index) => {
      const wrapper = document.createElement("div");
      const placement = placementPool[index];
      wrapper.className = "character-figure";
      wrapper.style.setProperty(
        "--character-width",
        index === 0 ? "clamp(12rem, 20vw, 21rem)" : "clamp(9rem, 15vw, 16rem)",
      );
      wrapper.style.setProperty("--character-opacity", String(0.2 + Math.random() * 0.1));
      wrapper.style[placement.side] = placement.offset;
      wrapper.style[placement.vertical] = placement.verticalOffset;
      wrapper.innerHTML = figure.markup;
      return wrapper;
    }),
  );

  try {
    window.sessionStorage.setItem("film-character-combo", combination);
  } catch {
    // The decorative layer does not depend on session storage.
  }
};

buildCharacters();
