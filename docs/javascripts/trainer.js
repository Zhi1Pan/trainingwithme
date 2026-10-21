(function () {
  'use strict';

  var STORE_KEY = 'gdt_trainer_v1';

  var MOOD_TEXT = {
    happy: '看起来很开心，尾巴摇得飞快',
    neutral: '状态平稳，正在观察四周',
    worried: '耳朵后压，看起来有些紧张',
    tired: '有点疲惫，训练兴致不高',
  };

  var LEVEL_CARDS = [
    { num: 1, title: '学会停下', sub: '强化与塑造', tagline: '用及时的正强化和逐步塑造，让小米学会「停」。' },
    { num: 2, title: '适应复杂环境', sub: '辨别与泛化', tagline: '把安静的院子里学会的技能，带进越来越热闹的街道。' },
    { num: 3, title: '安全优先', sub: '情境与人犬协作', tagline: '在模拟情境中练习判断：什么时候听犬的提示，什么时候由人决策。' },
  ];

  var PRINCIPLES = [
    { title: '操作性条件作用与正强化', text: '行为之后的结果决定行为的未来；及时的正强化让好行为更常出现。' },
    { title: '行为塑造', text: '小步推进，对逐步接近目标的表现给予强化，而不是要求一步到位。' },
    { title: '强化时机', text: '强化物必须在目标行为之后尽快出现，迟到的奖励效果微弱，还可能强化错误的行为。' },
    { title: '刺激辨别与刺激泛化', text: '学会分辨「何时执行」，并在多样情境中练习，把技能迁移到新环境。' },
    { title: '渐进适应与脱敏', text: '从低强度刺激开始，在动物保持平静的前提下逐步提高难度。' },
    { title: '动物福利与人犬协作', text: '关注动物的健康与情绪，训练应是愉快且自愿的；提示来自犬，判断来自人。' },
  ];

  var SCORE_RULE = '每个决策按行为科学合理性评出模拟得分：推荐策略 25 分（第三关 34 分）、部分有效 10~15 分、风险或低效策略 5~6 分。三个关卡分别计算模拟掌握度，最终取三关平均作为总评。';

  var SUMMARY_TIERS = [
    { min: 85, title: '综合优秀', text: '你展现了对正强化、行为塑造、刺激泛化与人犬协作的整体理解，三个关卡的决策都基本符合行为科学原理。' },
    { min: 65, title: '综合良好', text: '整体方向正确，部分概念还有提升空间。可以参考下方「值得改进的决策」逐条回顾。' },
    { min: 45, title: '综合一般', text: '一些关键原理（如奖励时机、渐进适应）还没有完全把握。建议针对薄弱关卡重玩，体会不同策略的差异。' },
    { min: 0, title: '需要加油', text: '别灰心！重新开始一轮，试着从「及时奖励、小步推进、渐进适应、福利优先」出发，结果会不一样。' },
  ];

  var LEVELS = {
    1: {
      id: 1,
      name: '第一关 · 学会停下',
      resultTiers: [
        { min: 85, title: '优秀', text: '小米已经能稳定地响应「停」的口令。你的策略体现了正强化的核心要领：奖励及时、小步塑造、关注状态——这正是行为塑造的经典思路。' },
        { min: 65, title: '良好', text: '小米基本掌握了「停」，但个别决策拖慢了进度。对照每步的科学原理回顾一下，下一次会更高效。' },
        { min: 45, title: '一般', text: '训练有进展但不稳定。奖励时机、训练难度的把握还有提升空间，建议重玩本关，比较不同选择的结果。' },
        { min: 0, title: '需要改进', text: '小米的「停」还不稳定。延迟奖励、惩罚和过大的步子都在拖后腿。试着从「及时正强化 + 小步塑造」的思路重新开始。' },
      ],
      steps: [
        {
          id: 'l1s1',
          title: '第一课：让「停」变得有意义',
          situation: '今天是小米的第一次训练。它对这个词完全没有概念，只是好奇地跟在你身边。你该从哪里开始？',
          options: [
            {
              id: 'a',
              label: '抓时机：散步时只要小米自己放慢或停下，我立刻说「停」并给一小块零食。',
              feedback: '几次之后，小米开始在你刚说出「停」时抬头看你，似乎把口令和零食联系起来了。训练有了一个好的开头。',
              science: '你用了操作性条件作用：行为（停下）之后立刻出现愉快的结果（零食），这个行为就会更常出现。零食在这里是「正强化物」，行为频率上升的过程叫「强化」。让口令与行为自然配对，是建立新行为的第一步。',
              score: 25,
              best: true,
              impact: { m: 10, s: -5 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '立刻纠错：小米没停的时候就拉一下绳子，并大声说「停」。',
              feedback: '小米开始对「停」这个词表现紧张，尾巴下垂，听到口令时反而加快脚步。训练几乎没有任何进展。',
              science: '这是「正惩罚」（在行为之后加入厌恶刺激）。惩罚容易让狗把口令本身和不舒服的体验联系起来，产生恐惧与回避，还可能损害你们之间的信任——这也是动物福利关注的问题。现代训练通常优先选择强化而不是惩罚。',
              score: 5,
              impact: { m: -15, s: 25 },
              mood: 'worried',
            },
            {
              id: 'c',
              label: '先说后奖：先说「停」，然后不管小米有没有停，过一会儿都喂零食。',
              feedback: '小米学会了在你说话时坐等零食，但并没有把「停」和停止动作联系起来。训练进度缓慢。',
              science: '强化物必须与目标行为「配对」。零食落在无关行为之后，被强化的就是等待而不是停止。行为与结果之间的关联性是操作性条件作用的关键——奖励要跟在正确行为的后面，而不是随口说个词就给。',
              score: 12,
              impact: { m: -5, s: -2 },
              mood: 'neutral',
            },
          ],
        },
        {
          id: 'l1s2',
          title: '关键决策：什么时候给奖励',
          situation: '几天后，小米偶然在你说「停」时停下了脚步。这是好机会！你决定奖励它——但什么时候给？',
          options: [
            {
              id: 'a',
              label: '立刻给：在它停下的一瞬间（约 1 秒内）送上一小块零食。',
              feedback: '接下来一周，小米听到「停」就停下的次数明显增多，学习速度令人满意。',
              science: '强化物出现得越快，动物越容易把它和刚才的行为联系起来。行为与结果在时间上的接近性是形成有效学习的重要条件；延迟太久，中间发生的无关行为会被误强化。',
              score: 25,
              best: true,
              impact: { m: 10, s: -3 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '攒着给：先口头夸两句，等几分钟回到家再给一大块零食。',
              feedback: '训练没有起色。更糟的是，小米似乎把奖励和「走回家」联系了起来，一到家门口就兴奋。',
              science: '迟到的奖励无法与「停下」配对：被强化的可能是「回家」这个行为。行为科学普遍认为，延迟的强化物效果微弱，这是操作性条件作用的基本原则之一。',
              score: 5,
              impact: { m: -8, s: 2 },
              mood: 'neutral',
            },
            {
              id: 'c',
              label: '多多益善：每次都给一整把零食，让它吃得饱饱的。',
              feedback: '起初几天效果不错，但很快小米对零食兴趣下降，听到「停」也懒洋洋的，训练效率下滑。',
              science: '强化物的价值会因「饱足」而降低；一次给太多还带来健康与福利隐患。小块、及时、适度的奖励通常更有效。之后逐步用口头表扬部分替代零食，也是维持行为的常见做法。',
              score: 12,
              impact: { m: -10, s: 3 },
              mood: 'tired',
            },
          ],
        },
        {
          id: 'l1s3',
          title: '提高标准：怎么让「停」更稳',
          situation: '小米已经能在安静的院子里有八成把握完成「停」。接下来你打算怎么让它更稳定？',
          options: [
            {
              id: 'a',
              label: '小步推进：先在院子不同位置练，再去小区安静路段，每一步都等表现稳定再前进。',
              feedback: '每次换地方，头几次会分心，但很快恢复状态。几周后，小米在多个安静地点都能稳定停下。',
              science: '这就是「行为塑造」：不要求一次到位，而是对逐步接近目标的表现给予强化，小步逼近最终目标。每一步都让行为稳固后再提升标准，成功率始终保持在较高水平。',
              score: 25,
              best: true,
              impact: { m: 8, s: -4 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '一步到位：直接带它去车流繁忙的马路边练「停」。',
              feedback: '小米被车声和行人吸引，几乎完全听不进口令。之前建立的表现也出现倒退。',
              science: '标准提高得过快，超过了动物当前的能力范围，行为反而会消退。塑造的关键在于步子小到动物能够成功——只有成功的行为才能被强化。这是行为塑造原则的典型误用。',
              score: 5,
              impact: { m: -15, s: 22 },
              mood: 'worried',
            },
            {
              id: 'c',
              label: '反复磨炼：每天在同一位置重复同一练习，重复一百次。',
              feedback: '小米在院子里表现得完美无缺，可一换到别的环境就「失忆」，像是从没学过一样。',
              science: '只在单一情境中强化，狗会把「停」和特定地点绑在一起——这是「刺激辨别」过头了：它学会的是「在这个位置停下有奖励」，而不是「听到口令就停下」。行为需要在多种情境下练习，才能实现泛化。',
              score: 10,
              impact: { m: -6, s: -2 },
              mood: 'neutral',
            },
          ],
        },
        {
          id: 'l1s4',
          title: '长期安排：训练与福利怎么平衡',
          situation: '训练已经见效。为了长期维持效果，同时照顾小米的身心状态，你打算怎么安排后续训练？',
          options: [
            {
              id: 'a',
              label: '短而频：每次 5 到 10 分钟、一天 2 到 3 次，零食和口头表扬交替使用。',
              feedback: '小米保持着积极状态，一周后「停」的成功率稳定在九成以上，而且每次看到训练绳都眼睛发亮。',
              science: '短时多次的训练更符合动物注意力与动机的规律；逐步用口头表扬等自然强化替代部分零食，是维持行为的常见策略。这同时也照顾了动物福利：训练是愉快的、自愿参与的。',
              score: 25,
              best: true,
              impact: { m: 12, s: -8 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '一次练透：每天一次，练足两小时，直到它完全掌握为止。',
              feedback: '训练后半程，小米开始趴下打哈欠、频繁舔鼻子，对零食也提不起兴趣，效率明显下降。',
              science: '长时间训练容易导致疲劳和动机下降，学习效率反而降低。动物福利要求我们关注动物的身体与情绪状态——在疲惫中继续训练，既低效也不公平。',
              score: 5,
              impact: { m: -18, s: 15 },
              mood: 'tired',
            },
            {
              id: 'c',
              label: '全靠零食：每次都喂高级零食，喂得越多，效果越好。',
              feedback: '效果确实不错，但小米开始对普通零食「挑食」，而且体重有超标迹象。',
              science: '高价值强化物确实有效，但过度依赖单一强化物会带来饱足和健康问题。行为科学中常通过调整「强化计划」（例如从每次都奖励过渡到部分奖励）来维持行为并减少依赖。',
              score: 15,
              impact: { m: -4, s: 6 },
              mood: 'neutral',
            },
          ],
        },
      ],
    },
    2: {
      id: 2,
      name: '第二关 · 适应复杂环境',
      resultTiers: [
        { min: 85, title: '优秀', text: '小米在不同环境中都能稳定执行口令，说明你为刺激泛化打下了扎实基础：环境是逐步变复杂的，判断标准是稳定表现而不是单次发挥。' },
        { min: 65, title: '良好', text: '整体方向正确，但环境难度推进的节奏或判断标准还有改进空间。泛化需要足够多、足够多样的练习。' },
        { min: 45, title: '一般', text: '小米对环境变化的适应还不稳定。回忆一下「渐进适应」的原则：从低强度刺激开始，步子别迈得太大。' },
        { min: 0, title: '需要改进', text: '小米在复杂环境中表现不佳。一次性暴露、惩罚式提醒与完全回避都阻碍了泛化的建立。建议重玩本关。' },
      ],
      steps: [
        {
          id: 'l2s1',
          title: '走出院子：进入小区',
          situation: '小米在院子里表现稳定。今天你带它到小区里训练，环境里多了鸟叫声、风声和偶尔经过的居民。',
          options: [
            {
              id: 'a',
              label: '换着来：在不同时间、不同角落重复「停」的训练，表现稳定再考虑换地方。',
              feedback: '头两天有些分心，几天之后，小米在小区各处都能稳定停下，环境适应度稳步上升。',
              science: '在新情境中复习已会的行为，是建立「刺激泛化」的过程：让「停」不再只和院子绑定。泛化不会自动发生，需要主动的、多样化的练习。',
              score: 25,
              best: true,
              impact: { m: 10, s: -4 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '先压压惊：直接带它去早市门口这种人最多的地方「适应一下」。',
              feedback: '小米被嘈杂的人声淹没，连最基本的口令都没有反应，只能提前结束训练。',
              science: '环境难度一次提得太高，动物会进入难以学习的状态。环境适应需要循序渐进——这与脱敏训练「从低强度开始」的原则一致。步子太大，泛化就无从建立。',
              score: 5,
              impact: { m: -12, s: 20 },
              mood: 'worried',
            },
            {
              id: 'c',
              label: '见好就收：今天表现不错，以后每周只在院子里练一次，保持手感。',
              feedback: '一周后回到小区，小米的「停」明显生疏了，像退回了刚起步的时候。',
              science: '已建立的行为若长期缺乏强化练习，会出现「消退」。技能需要持续的、有间隔的复习；同时，练习环境太单一，也难以为泛化打下基础。',
              score: 10,
              impact: { m: -6, s: -2 },
              mood: 'neutral',
            },
          ],
        },
        {
          id: 'l2s2',
          title: '人群经过：注意力被吸引',
          situation: '小区已经没问题。你带小米来到安静的人行道练习，偶尔有行人经过，小米会抬头张望，有时忘了口令。',
          options: [
            {
              id: 'a',
              label: '借题发挥：有行人经过时照样训练，做到了就给奖励；状态差就退回安静处。',
              feedback: '起初每次有人经过都会分心，一周后注意力明显提升，有人经过也能稳定完成口令。',
              science: '在有干扰的情境中强化正确行为，是「刺激辨别」训练：让小米学会「即使有行人，口令依然有效」。同时保留退回安静处的余地，避免超出能力范围，兼顾学习效率与动物福利。',
              score: 25,
              best: true,
              impact: { m: 10, s: -5 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '有人就躲：只在没有行人的时候练习，行人一来就带小米离开。',
              feedback: '小米在空无一人的路段表现很好，但只要有人经过，就完全「失控」。',
              science: '避开干扰源，等于没有练习「在干扰下保持行为」。训练条件越接近真实使用环境，行为迁移的效果越好。这是泛化训练的不足。',
              score: 12,
              impact: { m: -4, s: -3 },
              mood: 'neutral',
            },
            {
              id: 'c',
              label: '呵斥提醒：小米看向行人的时候，大声呵斥「专注！」。',
              feedback: '小米变得更加紧张，对行人出现格外警觉，训练效率明显下降。',
              science: '惩罚式的提醒容易让狗把「行人出现」与不愉快的体验联系起来，反而加深了对干扰源的敏感。行为科学普遍强调：优先用强化塑造期望行为，而不是用惩罚压制分心。',
              score: 5,
              impact: { m: -10, s: 18 },
              mood: 'worried',
            },
          ],
        },
        {
          id: 'l2s3',
          title: '突发噪音：施工路段',
          situation: '训练路线旁突然出现施工噪音。小米第一次听到时耳朵后压、尾巴下垂，脚步迟疑，不敢往前走。',
          options: [
            {
              id: 'a',
              label: '拉远距离：先退到较远、音量低的位置训练，之后每天略微靠近一点。',
              feedback: '几天之后，小米在距离工地几十米处也能正常完成口令，情绪保持平稳。',
              science: '这是「脱敏/系统化适应」的思路：让动物在低强度的刺激下保持平静，再逐步提高强度。每一步都以「动物保持平静且能完成任务」为前提，步子太大反而会适得其反。',
              score: 25,
              best: true,
              impact: { m: 8, s: -10 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '硬扛一下：坚持在工地旁边练习，练到它习惯为止。',
              feedback: '小米越来越紧张，开始对训练绳产生抗拒，甚至不愿意出门。训练被迫中断。',
              science: '在动物处于恐惧状态时强行暴露，容易造成「敏感化」——恐惧不但没有减轻，反而加重，还可能泛化到训练情境本身。这违背了渐进适应的原则，也存在动物福利风险。',
              score: 5,
              impact: { m: -14, s: 24 },
              mood: 'worried',
            },
            {
              id: 'c',
              label: '绕道处理：以后全部绕开施工路段，不让它接触噪音。',
              feedback: '小米的其余训练不受影响，但偶尔遇到突发噪音时仍然惊慌失措。',
              science: '回避能保障当下的福利，但完全没有接触，狗就无法获得「噪音并不可怕」的经验。理想的做法是保护与渐进接触相结合；完全回避会让未来的突发状况更难应对。',
              score: 10,
              impact: { m: -3, s: -6 },
              mood: 'neutral',
            },
          ],
        },
        {
          id: 'l2s4',
          title: '判断标准：何时进入下一阶段',
          situation: '三周过去了，小米的表现时好时坏。什么时候才适合进入更复杂的道路情境训练？',
          options: [
            {
              id: 'a',
              label: '看稳定表现：连续一周、每天不同时段、不同路线都能保持高成功率，才进入下一阶段。',
              feedback: '你多花了一周时间巩固。进入下一阶段后过渡平稳，几乎无缝衔接。',
              science: '判断「学会」要看行为在不同情境下的稳定性和可重复性，而不是单次表现。用客观标准（如成功率）做判断，比凭感觉更可靠，这也是行为评估的基本方法。',
              score: 25,
              best: true,
              impact: { m: 8, s: -5 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '看一次表现：今天早上表现得特别好，明天就上大马路。',
              feedback: '第二天的大马路让小米手忙脚乱，之前的进步倒退了不少，需要重新巩固。',
              science: '单次优异表现可能包含偶然因素（状态好、环境恰好简单等）。仅凭一次表现评估学习水平，容易高估。稳定、可重复，才是行为真正习得的标志。',
              score: 5,
              impact: { m: -10, s: 14 },
              mood: 'worried',
            },
            {
              id: 'c',
              label: '跟着感觉：我觉得它状态好的时候，就往前走。',
              feedback: '训练进度时好时坏，几次冒进都被迫退回，总体进展缓慢。',
              science: '主观感觉可以作为参考，但缺乏客观指标容易受当天情绪影响。记录行为表现、设定明确的通过标准，是更可靠的评估方式。',
              score: 12,
              impact: { m: -2, s: -2 },
              mood: 'neutral',
            },
          ],
        },
      ],
    },
    3: {
      id: 3,
      name: '第三关 · 安全优先',
      resultTiers: [
        { min: 85, title: '优秀', text: '你的决策充分体现了「人犬协作」：既重视犬的提示，也承担了人的判断责任，并把动物福利放在首位。' },
        { min: 65, title: '良好', text: '大部分情境处理得当，个别决策对协作与安全的理解有偏差。记住：提示来自犬，判断来自人。' },
        { min: 45, title: '一般', text: '部分决策把责任过多地推给犬，或忽视了犬的提示。真实导盲工作中，安全判断由使用者作出。' },
        { min: 0, title: '需要改进', text: '协作决策存在较多风险。请重玩本关，重点体会「犬提示、人决策」的分工与动物福利优先的原则。' },
      ],
      steps: [
        {
          id: 'l3s1',
          title: '情境一：人行横道前',
          situation: '模拟练习中，你和小米来到一条没有红绿灯的人行横道前。小米在路口停了下来——经过训练，它通常会在台阶和路口前停住提示你。',
          options: [
            {
              id: 'a',
              label: '先判断再走：小米停下后，我先听车流、判断安全，确认后再下「前进」指令。',
              feedback: '你顺利通过路口。小米配合你的节奏，整个过程平稳、可预期。协作评分：优秀。',
              science: '这是「人犬协作」的典型模式：犬提供物理提示（停在路口），人承担判断与决策。受过训练的导盲犬还可能有「智能不服从」——在危险时拒绝执行指令，但这不等于犬能独立判断交通。安全决策始终由使用者作出。',
              score: 34,
              best: true,
              impact: { m: 10, s: -6 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '完全交给它：我相信小米会带我过马路，它往前走，我就跟着走。',
              feedback: '一辆电动车从侧面驶近，小米停住了，但你对周围情况一无所知。过马路的过程充满不确定性，模拟中标记为高风险。',
              science: '这是一个常见的误解：导盲犬不会「看红绿灯」，也不能独立判断所有交通风险。犬的提示是辅助信息，使用者必须综合声音、车流规律等线索作出判断。把全部安全责任交给犬是危险的。',
              score: 6,
              impact: { m: -8, s: 15 },
              mood: 'worried',
            },
            {
              id: 'c',
              label: '自己拿主意：不等小米的信号，我估摸着时机直接过马路。',
              feedback: '你差点被马路牙子绊倒——小米本来已经准备在路口前停下提示你了。协作信息被白白浪费。',
              science: '训练有素的犬提供的提示（如台阶与路口前的停顿）是重要的安全信息。忽视犬的信号，等于放弃了协作中一半的信息通道。良好的协作是双向的：人听取犬的提示，犬执行人的指令。',
              score: 12,
              impact: { m: -6, s: 5 },
              mood: 'neutral',
            },
          ],
        },
        {
          id: 'l3s2',
          title: '情境二：道路被围挡占住',
          situation: '模拟中，前方人行道被施工围挡完全占住，你无法继续直行。手边有手机导航，附近也可能有路人。',
          options: [
            {
              id: 'a',
              label: '调整路线：我先用导航或询问确认可绕行的路线，再用口令引导小米右转绕行。',
              feedback: '小米根据你的口令平稳绕行，避开围挡后回到原路线。协作评分：优秀。',
              science: '情境变化时，人提供新指令、犬执行指令，这正是协作的体现。导盲犬不能自己规划路线，路线决策来自使用者。提前获取环境信息、主动调整，比被动撞上障碍更安全。',
              score: 34,
              best: true,
              impact: { m: 10, s: -5 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '让小米找路：把决定权交给它，它总能找到路。',
              feedback: '小米犹豫不前，在原地打转，最后你们只能原路返回。',
              science: '犬的「识路」能力与人类理解的道路系统是两回事。导盲犬训练的重点是执行口令和规避障碍，而不是自主导航。期待犬自主决定路线，是对其能力不切实际的假设。',
              score: 6,
              impact: { m: -8, s: 8 },
              mood: 'worried',
            },
            {
              id: 'c',
              label: '原路硬走：按原路线一直走，撞到围挡再想办法。',
              feedback: '你们一直走到围挡前才停下，浪费了时间，小米也露出困惑的表情。',
              science: '围挡前的提示是犬协作能力的体现，但路线的判断与调整是使用者的责任。事先获取环境信息、提前规划，能让协作更顺畅、更安全。',
              score: 12,
              impact: { m: -5, s: 4 },
              mood: 'neutral',
            },
          ],
        },
        {
          id: 'l3s3',
          title: '情境三：小米状态不佳',
          situation: '今天的训练中，小米多次没有在台阶前停下，走路时尾巴夹着，对零食也不感兴趣，和平时判若两犬。',
          options: [
            {
              id: 'a',
              label: '暂停训练：立刻结束今天的训练，观察小米的状态，必要时联系兽医。',
              feedback: '休息一天后小米恢复了活力。事后发现它昨天走路太多，脚掌有些疲劳。协作评分：优秀。',
              science: '动物福利要求把动物的健康与情绪放在训练目标之前。行为突然改变往往是身体或情绪问题的信号。现代训练强调训练应当是愉快且自愿参与的；在疲劳或不适时继续施压，既无效也不公平。',
              score: 34,
              best: true,
              impact: { m: 8, s: -12 },
              mood: 'happy',
            },
            {
              id: 'b',
              label: '加大筹码：拿出最高级的零食，加倍练习，帮它找回状态。',
              feedback: '小米勉强配合了几次，但第二天状态更差，甚至不愿穿上训练背带。',
              science: '用奖励强行驱动身体不适的动物，可能掩盖问题信号，甚至让动物对训练产生负面联想。福利优先意味着先排除健康与情绪因素，而不是提高奖励的「剂量」。',
              score: 6,
              impact: { m: -15, s: 15 },
              mood: 'tired',
            },
            {
              id: 'c',
              label: '立刻纠正：对每次失误都严肃指正，让它打起精神。',
              feedback: '小米更紧张了，失误不减反增，训练气氛十分压抑。',
              science: '惩罚失误对解决「状态不佳」没有帮助——如果原因是疲劳或不适，惩罚只会增加压力。行为科学提醒我们：先找行为变化的原因，而不是先惩罚行为本身。',
              score: 12,
              impact: { m: -12, s: 20 },
              mood: 'worried',
            },
          ],
        },
      ],
    },
  };

  function defaultState() {
    return {
      current: null,
      records: { 1: null, 2: null, 3: null },
      progress: { 1: null, 2: null, 3: null },
    };
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        var base = defaultState();
        if (parsed && typeof parsed === 'object') {
          if (parsed.records && typeof parsed.records === 'object') base.records = parsed.records;
          if (parsed.progress && typeof parsed.progress === 'object') base.progress = parsed.progress;
          if (typeof parsed.current === 'number') base.current = parsed.current;
        }
        return base;
      }
    } catch (e) {}
    return defaultState();
  }

  var state = loadState();

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  }

  function prog() {
    if (!state.progress[state.current]) {
      state.progress[state.current] = {
        stepIndex: 0,
        chosen: null,
        prevDog: null,
        dog: { progress: 0, motivation: 72, stress: 28 },
      };
    }
    return state.progress[state.current];
  }

  function newRecord(level) {
    return { level: level, steps: [], score: 0, max: 0, pct: 0, message: '', tier: '', done: false };
  }

  function stepMax(step) {
    return Math.max.apply(null, step.options.map(function (o) { return o.score; }));
  }

  function tierChip(grade) {
    if (grade === 'good') return '<span class="gdt-chip gdt-chip-good">推荐策略</span>';
    if (grade === 'mid') return '<span class="gdt-chip gdt-chip-mid">部分有效</span>';
    return '<span class="gdt-chip gdt-chip-poor">风险/低效</span>';
  }

  function startLevel(n) {
    state.records[n] = newRecord(n);
    state.progress[n] = {
      stepIndex: 0,
      chosen: null,
      prevDog: null,
      dog: { progress: 0, motivation: 72, stress: 28 },
    };
    state.current = n;
    save();
  }

  function resetAll() {
    state = defaultState();
    save();
  }

  function hasAnyProgress() {
    var nums = [1, 2, 3];
    for (var i = 0; i < nums.length; i++) {
      if (state.records[nums[i]] || state.progress[nums[i]]) return true;
    }
    return false;
  }

  function bindHomeGuard() {
    var logo = document.querySelector('a[data-md-component="logo"]');
    if (!logo) return;
    var homeHref = new URL(logo.getAttribute('href') || '.', location.href).href;
    var homeBase = homeHref.replace(/#.*$/, '').replace(/\/+$/, '');
    var here = location.href.replace(/#.*$/, '').replace(/\/+$/, '');

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var target = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!target) return;
      var dest = target.href.replace(/#.*$/, '').replace(/\/+$/, '');
      if (dest !== homeBase || here === homeBase) return;
      if (!hasAnyProgress()) return;
      e.preventDefault();
      if (window.confirm('返回首页将清空所有训练分数与进度，确定继续吗？')) {
        resetAll();
        window.location.href = homeHref;
      }
    });
  }

  function chooseOption(optionId) {
    var p = prog();
    var level = LEVELS[state.current];
    var step = level.steps[p.stepIndex];
    var opt = step.options.filter(function (o) { return o.id === optionId; })[0];
    p.prevDog = { progress: p.dog.progress, motivation: p.dog.motivation, stress: p.dog.stress };
    p.dog.progress = clamp(p.dog.progress + opt.score, 0, 100);
    p.dog.motivation = clamp(p.dog.motivation + opt.impact.m, 5, 98);
    p.dog.stress = clamp(p.dog.stress + opt.impact.s, 2, 98);
    p.chosen = optionId;
    save();
  }

  function rechooseOption() {
    var p = prog();
    if (!p.prevDog) return;
    p.dog = { progress: p.prevDog.progress, motivation: p.prevDog.motivation, stress: p.prevDog.stress };
    p.prevDog = null;
    p.chosen = null;
    save();
  }

  function nextStep() {
    var p = prog();
    var level = LEVELS[state.current];
    var rec = state.records[state.current];
    var step = level.steps[p.stepIndex];
    var opt = step.options.filter(function (o) { return o.id === p.chosen; })[0];
    var max = stepMax(step);
    rec.steps.push({
      stepId: step.id,
      title: step.title,
      optionId: opt.id,
      label: opt.label,
      score: opt.score,
      grade: opt.score === max ? 'good' : opt.score >= max * 0.5 ? 'mid' : 'poor',
      feedback: opt.feedback,
      science: opt.science,
    });
    rec.score += opt.score;
    p.stepIndex += 1;
    p.chosen = null;
    p.prevDog = null;
    if (p.stepIndex >= level.steps.length) {
      rec.max = level.steps.reduce(function (s, st) { return s + stepMax(st); }, 0);
      rec.pct = Math.min(100, Math.round((rec.score / rec.max) * 100));
      rec.tier = level.resultTiers.filter(function (t) { return rec.pct >= t.min; })[0];
      rec.message = rec.tier.text;
      rec.done = true;
    }
    save();
  }

  function meterHtml(label, value, cls) {
    return '<div class="gdt-meter">' +
      '<span class="gdt-meter-label">' + label + '</span>' +
      '<span class="gdt-meter-track"><span class="gdt-meter-fill ' + cls + '" data-w="' + value + '"></span></span>' +
      '<span class="gdt-meter-value">' + value + '</span>' +
      '</div>';
  }

  function dogPanelHtml() {
    var p = prog();
    var chosenOption = p.chosen ? LEVELS[state.current].steps[p.stepIndex].options.filter(function (o) { return o.id === p.chosen; })[0] : null;
    var mood = chosenOption ? chosenOption.mood : p.dog.motivation < 40 ? 'tired' : p.dog.stress > 60 ? 'worried' : 'neutral';
    var stressCls = p.dog.stress <= 40 ? 'gdt-meter-stress-low' : p.dog.stress <= 65 ? 'gdt-meter-stress-mid' : 'gdt-meter-stress-high';
    return '<div class="gdt-panel">' +
      '<div class="gdt-dog-info">' +
      '<p class="gdt-dog-name">小米 · 你的训练搭档</p>' +
      '<p class="gdt-dog-mood"><span class="gdt-dot mood-' + mood + '"></span>' + MOOD_TEXT[mood] + '</p>' +
      '</div>' +
      '<div class="gdt-meters">' +
      meterHtml('学习进度', p.dog.progress, 'gdt-meter-progress') +
      meterHtml('动机', p.dog.motivation, 'gdt-meter-motive') +
      meterHtml('压力', p.dog.stress, stressCls) +
      '</div>' +
      '</div>';
  }

  function statsPanelHtml(total, index, showProgress) {
    var rec = state.records[state.current];
    var levelTotal = rec.max > 0 ? rec.max : LEVELS[state.current].steps.reduce(function (s, st) { return s + stepMax(st); }, 0);
    var progressHtml = showProgress
      ? '<div class="gdt-progress-row">' +
        '<span class="gdt-progress-label">训练进度：第 ' + (index + 1) + ' / ' + total + ' 步</span>' +
        '<div class="gdt-progress"><div class="gdt-progress-fill" style="width:' + Math.round((index / total) * 100) + '%"></div></div>' +
        '</div>'
      : '';
    return dogPanelHtml() + progressHtml +
      '<div class="gdt-stats-card">' +
      '<p class="gdt-stats-title">本关统计</p>' +
      '<div class="gdt-stats-line"><span>已完成决策</span><b>' + rec.steps.length + ' / ' + total + '</b></div>' +
      '<div class="gdt-stats-line"><span>累计得分</span><b>' + rec.score + ' / ' + levelTotal + '</b></div>' +
      '</div>';
  }

  function levelHtml() {
    var level = LEVELS[state.current];
    var steps = level.steps;
    var finished = state.records[state.current].done;

    if (!finished) {
      var p = prog();
      var step = steps[p.stepIndex];
      var isLast = p.stepIndex === steps.length - 1;

      if (p.chosen === null) {
        return '<div class="gdt-layout">' +
          '<aside class="gdt-stats">' + statsPanelHtml(steps.length, p.stepIndex, true) + '</aside>' +
          '<div class="gdt-main">' +
          '<div class="gdt-card">' +
          '<p class="gdt-kicker">训练决策 ' + (p.stepIndex + 1) + ' / ' + steps.length + '</p>' +
          '<h2 class="gdt-step-title">' + step.title + '</h2>' +
          '<p class="gdt-situation">' + step.situation + '</p>' +
          '<div class="gdt-options">' +
          step.options.map(function (o, i) {
            var letters = ['A', 'B', 'C'];
            return '<button type="button" class="gdt-option" data-action="choose-option" data-option="' + o.id + '">' +
              '<span class="gdt-opt-badge">' + letters[i] + '</span>' +
              '<span class="gdt-opt-text">' + o.label + '</span>' +
              '</button>';
          }).join('') +
          '</div>' +
          '<p class="gdt-choose-hint">选择一种做法，点击后查看模拟结果。</p>' +
          '</div>' +
          '</div>' +
          '</div>';
      }

      var chosenOption = step.options.filter(function (o) { return o.id === p.chosen; })[0];
      var bestOption = step.options.filter(function (o) { return o.best; })[0];
      var max = stepMax(step);
      var grade = chosenOption.score === max ? 'good' : chosenOption.score >= max * 0.5 ? 'mid' : 'poor';
      return '<div class="gdt-layout">' +
        '<aside class="gdt-stats">' + statsPanelHtml(steps.length, p.stepIndex, true) + '</aside>' +
        '<div class="gdt-main">' +
        '<div class="gdt-card">' +
        '<p class="gdt-kicker">训练决策 ' + (p.stepIndex + 1) + ' / ' + steps.length + ' · 模拟反馈</p>' +
        '<h2 class="gdt-step-title">' + step.title + '</h2>' +
        '<p class="gdt-situation">' + step.situation + '</p>' +
        '<div class="gdt-choice-box">' +
        '<span class="gdt-choice-tag">你的选择</span>' +
        '<p class="gdt-choice-text">' + chosenOption.label + '</p>' +
        '<span class="gdt-choice-result">' + tierChip(grade) + '</span>' +
        '</div>' +
        (grade === 'good' ? '' : '<div class="gdt-best-hint"><span class="gdt-chip gdt-chip-good">推荐策略</span><p>' + bestOption.label + '</p></div>') +
        '<div class="gdt-feedback">' +
        '<div class="gdt-fb-block gdt-fb-sim"><p class="gdt-fb-head">模拟反馈</p><p>' + chosenOption.feedback + '</p></div>' +
        '<div class="gdt-fb-block gdt-fb-sci"><p class="gdt-fb-head">行为科学原理</p><p>' + chosenOption.science + '</p></div>' +
        '<div class="gdt-feedback-score">本步模拟得分：' + chosenOption.score + ' / ' + max + '</div>' +
        '</div>' +
        '<div class="gdt-step-actions">' +
        '<button type="button" class="gdt-btn gdt-btn-ghost" data-action="rechoose-option">换一个试试</button>' +
        '<button type="button" class="gdt-btn gdt-btn-primary" data-action="next-step">' + (isLast ? '查看本关结果' : '进入下一步') + '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    }

    var rec = state.records[state.current];
    var p = prog();
    var review = rec.steps.map(function (s, i) {
      return '<li><div class="gdt-review-step"><span class="gdt-review-num">' + (i + 1) + '</span>' +
        '<div class="gdt-review-body"><p class="gdt-review-title">' + s.title + '</p><p class="gdt-review-label">' + s.label + '</p></div>' +
        tierChip(s.grade) + '</div></li>';
    }).join('');
    var nextLabel = state.current < 3 ? '进入第 ' + (state.current + 1) + ' 关' : '查看训练总结';
    var nextHref = state.current < 3 ? '../level' + (state.current + 1) + '/' : '../summary/';

    return '<div class="gdt-layout">' +
      '<aside class="gdt-stats">' + statsPanelHtml(steps.length, steps.length, false) + '</aside>' +
      '<div class="gdt-main">' +
      '<div class="gdt-card gdt-result">' +
      '<p class="gdt-kicker">本关完成</p>' +
      '<h2 class="gdt-step-title">' + level.name + ' · 模拟结果</h2>' +
      '<div class="gdt-score-big">' +
      '<span class="gdt-result-big" data-pct-value="' + rec.pct + '">0</span><span class="gdt-result-unit">%</span>' +
      '<p class="gdt-score-caption">模拟掌握度</p>' +
      '</div>' +
      '<p class="gdt-result-tier-line">评级：<span class="gdt-result-tier">' + rec.tier.title + '</span></p>' +
      '<p class="gdt-result-msg">' + rec.message + '</p>' +
      '<div class="gdt-result-review"><p class="gdt-review-head">你的训练决策回顾</p><ul>' + review + '</ul></div>' +
      '<div class="gdt-step-actions gdt-result-actions">' +
      '<button type="button" class="gdt-btn gdt-btn-ghost" data-action="replay-level">重玩本关</button>' +
      '<a class="gdt-btn gdt-btn-primary" href="' + nextHref + '">' + nextLabel + '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function homeCardsHtml() {
    var doneCount = [1, 2, 3].filter(function (n) { return state.records[n] && state.records[n].done; }).length;
    var cards = LEVEL_CARDS.map(function (c) {
      var rec = state.records[c.num];
      var status = rec && rec.done
        ? '<span class="gdt-chip gdt-chip-good">已完成 · 掌握度 ' + rec.pct + '%</span>'
        : rec
          ? '<span class="gdt-chip gdt-chip-mid">进行中</span>'
          : '<span class="gdt-chip gdt-chip-idle">未开始</span>';
      return '<a href="./level' + c.num + '/" class="gdt-card-link">' +
        '<span class="gdt-jnum">0' + c.num + '</span>' +
        '<span class="gdt-jtitle">' + c.title + '</span>' +
        '<span class="gdt-jsub">' + c.sub + '</span>' +
        '<span class="gdt-jtagline">' + c.tagline + '</span>' +
        '<span class="gdt-jstatus">' + status + '</span>' +
        '</a>';
    }).join('');

    var allDone = doneCount === 3;
    var summaryCard = '<a href="./summary/" class="gdt-card-link">' +
      '<span class="gdt-jnum">04</span>' +
      '<span class="gdt-jtitle">训练总结</span>' +
      '<span class="gdt-jsub">回顾与分析</span>' +
      '<span class="gdt-jtagline">查看你的主要选择、模拟表现与行为科学分析。</span>' +
      '<span class="gdt-jprogress"><span class="gdt-jprogress-bar"><span class="gdt-jprogress-fill" style="width:' + Math.round((doneCount / 3) * 100) + '%"></span></span><span class="gdt-jprogress-text">已完成 ' + doneCount + ' / 3 关</span></span>' +
      '<span class="gdt-jstatus">' + (allDone ? '<span class="gdt-chip gdt-chip-good">可查看完整分析</span>' : '<span class="gdt-chip gdt-chip-idle">通关后解锁完整分析</span>') + '</span>' +
      '</a>';

    return '<div class="gdt-cards">' + cards + summaryCard + '</div>';
  }

  function summaryHtml() {
    var recs = [1, 2, 3].map(function (n) { return state.records[n]; });
    var allDone = recs.every(function (r) { return r && r.done; });

    if (!allDone) {
      var firstMissing = recs.map(function (r, i) { return r && r.done ? -1 : i + 1; }).filter(function (n) { return n > 0; })[0];
      var doneCount = recs.filter(function (r) { return r && r.done; }).length;
      var doneCards = recs
        .filter(function (r) { return r && r.done; })
        .map(function (rec) {
          var card = LEVEL_CARDS.filter(function (c) { return c.num === rec.level; })[0];
          return '<div class="gdt-card gdt-summary-level">' +
            '<div class="gdt-summary-level-head">' +
            '<div class="gdt-level-badge">0' + rec.level + '</div>' +
            '<div><h3>' + card.title + ' · ' + card.sub + '</h3><p class="gdt-summary-level-score">' + rec.pct + '% · ' + rec.tier.title + '</p></div>' +
            '</div>' +
            '<div class="gdt-progress"><div class="gdt-progress-fill" style="width:' + rec.pct + '%"></div></div>' +
            '</div>';
        })
        .join('');

      return '<div class="gdt-card gdt-incomplete">' +
        '<h2>训练总结</h2>' +
        '<p>你已完成 ' + doneCount + ' / 3 关。已完成关卡的成绩如下；完成全部关卡后，这里会显示完整的行为科学分析。</p>' +
        '</div>' +
        (doneCards ? '<div class="gdt-summary-levels">' + doneCards + '</div>' : '') +
        '<div class="gdt-step-actions gdt-center-actions">' +
        '<a class="gdt-btn gdt-btn-primary" href="../level' + firstMissing + '/">继续第 ' + firstMissing + ' 关</a>' +
        '<a class="gdt-btn gdt-btn-ghost" href="../">返回首页</a>' +
        '</div>';
    }

    var avg = Math.round(recs.reduce(function (s, r) { return s + r.pct; }, 0) / 3);
    var overall = SUMMARY_TIERS.filter(function (t) { return avg >= t.min; })[0];

    var levelCards = recs.map(function (rec) {
      var card = LEVEL_CARDS.filter(function (c) { return c.num === rec.level; })[0];
      var stepsDetail = rec.steps.map(function (s, i) {
        return '<li><div class="gdt-review-step"><span class="gdt-review-num">' + (i + 1) + '</span>' +
          '<div class="gdt-review-body"><p class="gdt-review-title">' + s.title + '</p><p class="gdt-review-label">' + s.label + '</p></div>' +
          tierChip(s.grade) + '</div></li>';
      }).join('');
      return '<div class="gdt-card gdt-summary-level">' +
        '<div class="gdt-summary-level-head">' +
        '<div class="gdt-level-badge">0' + rec.level + '</div>' +
        '<div><h3>' + card.title + ' · ' + card.sub + '</h3><p class="gdt-summary-level-score">' + rec.pct + '% · ' + rec.tier.title + '</p></div>' +
        '</div>' +
        '<div class="gdt-progress"><div class="gdt-progress-fill" style="width:' + rec.pct + '%"></div></div>' +
        '<p class="gdt-summary-level-msg">' + rec.message + '</p>' +
        '<details class="gdt-step-details"><summary>查看决策明细（' + rec.steps.length + ' 步）</summary><ul>' + stepsDetail + '</ul></details>' +
        '</div>';
    }).join('');

    var good = [];
    var improve = [];
    recs.forEach(function (rec) {
      var card = LEVEL_CARDS.filter(function (c) { return c.num === rec.level; })[0];
      rec.steps.forEach(function (s) {
        if (s.grade === 'good') good.push({ level: card.title, step: s.title, label: s.label, science: s.science });
        else improve.push({ level: card.title, step: s.title, label: s.label, science: s.science });
      });
    });

    var goodList = good.length
      ? good.map(function (g) { return '<li><p class="gdt-strategy-level">' + g.level + '</p><p class="gdt-strategy-title">' + g.step + '</p><p class="gdt-strategy-label">' + g.label + '</p></li>'; }).join('')
      : '<li><p class="gdt-strategy-label">本轮没有达到推荐标准的决策，建议重新训练一轮。</p></li>';

    var improveList = improve.length
      ? improve.map(function (g) {
          return '<li class="gdt-improve-item">' +
            '<p class="gdt-strategy-level">' + g.level + ' · ' + g.step + '</p>' +
            '<p class="gdt-strategy-label">你的选择：' + g.label + '</p>' +
            '<p class="gdt-strategy-science">改进提示：' + g.science + '</p>' +
            '</li>';
        }).join('')
      : '<li><p class="gdt-strategy-label">没有需要改进的决策，三个关卡全部选择了推荐策略。</p></li>';

    return '<div class="gdt-card gdt-overall">' +
      '<div class="gdt-overall-score">' +
      '<div class="gdt-score-big gdt-score-big-sm">' +
      '<span class="gdt-result-big" data-pct-value="' + avg + '">0</span><span class="gdt-result-unit">%</span>' +
      '<p class="gdt-score-caption">综合模拟掌握度</p>' +
      '</div>' +
      '<div class="gdt-overall-text"><span class="gdt-result-tier">' + overall.title + '</span><p>' + overall.text + '</p></div>' +
      '</div>' +
      '<p class="gdt-score-rule">评分说明：' + SCORE_RULE + '</p>' +
      '</div>' +

      '<div class="gdt-summary-levels">' + levelCards + '</div>' +

      '<div class="gdt-card gdt-strategies">' +
      '<h3>做得好的训练策略</h3>' +
      '<ul class="gdt-strategy-list gdt-good-list">' + goodList + '</ul>' +
      '<h3 class="gdt-strategies-divider">值得改进的决策</h3>' +
      '<ul class="gdt-strategy-list gdt-improve-list">' + improveList + '</ul>' +
      '</div>' +

      '<div class="gdt-card gdt-principles">' +
      '<h3>本课涉及的行为科学概念</h3>' +
      '<div class="gdt-principles-grid">' + PRINCIPLES.map(function (p) { return '<div class="gdt-principle-item"><h4>' + p.title + '</h4><p>' + p.text + '</p></div>'; }).join('') + '</div>' +
      '</div>' +

      '<div class="gdt-step-actions gdt-center-actions">' +
      '<button type="button" class="gdt-btn gdt-btn-primary" data-action="restart">重新开始训练</button>' +
      '<a class="gdt-btn gdt-btn-ghost" href="../">返回首页</a>' +
      '</div>';
  }

  function render(container, type) {
    container.innerHTML = type === 'level' ? levelHtml() : summaryHtml();
    postRender(container);
  }

  function postRender(root) {
    if (typeof requestAnimationFrame !== 'function') return;
    requestAnimationFrame(function () {
      var fills = root.querySelectorAll('.gdt-meter-fill[data-w]');
      for (var i = 0; i < fills.length; i++) {
        fills[i].style.width = fills[i].getAttribute('data-w') + '%';
      }
      var counters = root.querySelectorAll('[data-pct-value]');
      for (var j = 0; j < counters.length; j++) {
        (function (el) {
          var target = Number(el.getAttribute('data-pct-value'));
          if (!isFinite(target)) return;
          var dur = 900;
          var start = performance.now();
          var tick = function (now) {
            var t = Math.min(1, (now - start) / dur);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        })(counters[j]);
      }
    });
  }

  function bindEvents(container, type) {
    container.addEventListener('click', function (e) {
      var target = e.target.closest ? e.target.closest('[data-action]') : null;
      if (!target || !container.contains(target)) return;
      var action = target.getAttribute('data-action');
      if (action === 'choose-option') {
        chooseOption(target.getAttribute('data-option'));
        render(container, type);
      } else if (action === 'rechoose-option') {
        rechooseOption();
        render(container, type);
      } else if (action === 'next-step') {
        nextStep();
        render(container, type);
      } else if (action === 'replay-level') {
        if (window.confirm('重玩本关会清空本关记录，确定吗？')) {
          startLevel(state.current);
          render(container, type);
        }
      } else if (action === 'restart') {
        if (window.confirm('重新开始会清空所有关卡记录，确定吗？')) {
          resetAll();
          window.location.href = '../level1/';
        }
      }
      e.preventDefault();
    });
  }

  function init() {
    var levelBox = document.getElementById('trainer');
    var summaryBox = document.getElementById('trainer-summary');
    var homeBox = document.getElementById('home-cards');

    bindHomeGuard();

    if (levelBox) {
      var levelNum = Number(levelBox.getAttribute('data-level'));
      if (!state.records[levelNum]) {
        startLevel(levelNum);
      } else {
        state.current = levelNum;
        prog();
        save();
      }
      render(levelBox, 'level');
      bindEvents(levelBox, 'level');
    }

    if (summaryBox) {
      render(summaryBox, 'summary');
      bindEvents(summaryBox, 'summary');
    }

    if (homeBox) {
      homeBox.innerHTML = homeCardsHtml();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
