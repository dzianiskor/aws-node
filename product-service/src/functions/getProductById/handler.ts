import "source-map-support/register";

import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import {
  ParamException,
  ProductException,
  sendError,
} from "@libs/errorResolver";

const getProductById = async (event) => {
  try {
    // Get products
    const products = [
      {
        id: "1",
        name: "Marvel Человек-Паук",
        description:
          'Новые приключения Человека-Паука дадут читателям свежий взгляд на жизнь супергероя! Дополняя историю, рассказанную компанией Insomniac Games, в сюжете "Война в городе" мы узнаем расширенную историю двух злодеев вселенной, с которыми была тесно связана жизнь Паркера – гениального учёного и ментора Питера доктора Октавиуса, пытающегося создать лекарство от нейродегенеративных расстройств, и мистера Негатива, который является директором в приюте, где работает тётя Питера. Вместе они встают на путь злодеев с целью отомстить Нью-Йорку и мэру Озборну, а Паркер во что бы то ни стало должен им помешать, ведь на кону не только судьба города, но и жизнь его дорогой тётушки!',
        image:
          "https://static-sl.insales.ru/images/products/1/3121/464260145/6.jpg",
        year: "2021",
        price: "30",
      },
      {
        id: "2",
        name:
          "Супермен. Что случилось с Человеком Завтрашнего Дня? Издание делюкс",
        description:
          "Скромный репортер «Дэйли плэнет» Тим Крейн навещает миссис Лоис Эллиот, некогда знаменитую в Метрополисе журналистку, которая теперь живет тихой и спокойной жизнью в среднезападном городке вместе с мужем-трудягой и маленьким сыном. Крейн хочет взять интервью у Лоис о последних днях Супермена: ведь именно она была рядом с героем, когда самые злейшие враги, вступив в сговор, нанесли ему сокрушительный удар. Это время стало переломным. Тогда величайший защитник мира окончил свой земной путь…",
        image:
          "https://static-sl.insales.ru/images/products/1/4428/443298124/15.jpg",
        year: "2021",
        price: "30",
      },
    ];

    const { id } = event.pathParameters;
    const product = products.find((product) => product.id === id);

    if (!id) return sendError(new ParamException("ID not found"), 400);
    if (!product)
      return sendError(new ProductException("Product not found"), 400);

    return formatJSONResponse({
      product,
    });
  } catch (e) {
    return sendError(e, 400);
  }
};

export const main = middyfy(getProductById);
